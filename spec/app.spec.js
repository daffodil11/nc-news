process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const chai = require('chai');
chai.use(require('chai-sorted'));
const { expect } = chai;
const knex = require('../connection');
const { topicData, userData } = require('../db');

after(() => {
  return knex.destroy();
});

describe('/api/badroute', () => {
  it('404 error on non-existent route', () => {
    const methods = ['get', 'post', 'put', 'patch', 'del'];
    return Promise.all(
      methods.map(method => {
        return request[method]('/api/badroute').expect(404).then(({ body }) => {
          expect(body.msg).to.equal('Not found');
        });
      })
    );
  });
});

describe('/api/topics', () => {
  describe('GET', () => {
    it('status:200', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).to.deep.equal(topicData);
        });
    });
  });
  describe('disallowed methods', () => {
    it('status:405', () => {
      const methods = ['post', 'patch', 'put', 'del'];
      return Promise.all(
        methods.map(method => {
          return request[method]('/api/topics').expect(405);
        })
      );
    });
  });
});

describe('/api/users/:username', () => {
  describe('GET', () => {
    it('status:200', () => {
      return request
        .get('/api/users/butter_bridge')
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.deep.equal(
            userData.find(user => user.username === 'butter_bridge')
          );
        });
    });
    it('status:404 if the user does not exist', () => {
      return request.get('/api/users/nemo').expect(404);
    });
  });
  describe('disallowed methods', () => {
    it('status:405', () => {
      const methods = ['post', 'patch', 'put', 'del'];
      return Promise.all(
        methods.map(method => {
          return request[method]('/api/users/1').expect(405);
        })
      );
    });
  });
});

describe('/api/articles', () => {
  beforeEach(() => {
    return knex.seed.run();
  });
  const articleKeys = [
    'article_id',
    'title',
    'body',
    'votes',
    'topic',
    'author',
    'created_at',
    'comment_count'
  ];
  xdescribe('/', () => {
    describe('GET', () => {
      it('status:200 responds with array of article objects', () => {
        return request
          .get('/api/articles')
          .expect(200)
          .then(({ body: { articles } }) => {
            // Shallow test whole array
            articles.every(article =>
              expect(article).to.have.keys(...articleKeys)
            );

            //Thorough test of sample object
            const testArt = articles.find(
              article => article.title === "They're not exactly dogs, are they?"
            );
            expect(testArt.topic).to.equal('mitch');
            expect(testArt.votes).to.equal(0);
            expect(testArt.author).to.equal('butter_bridge');
            expect(testArt.comment_count).to.equal(2);
          });
      });
    });
    describe('disallowed methods', () => {
      it('status:405', () => {
        const methods = ['post', 'patch', 'put', 'del'];
        return Promise.all(
          methods.map(method => {
            return request[method]('/api/articles').expect(405);
          })
        );
      });
    });
  });
  xdescribe('/:article_id', () => {
    describe('GET', () => {
      it('status:200 responds with article object', () => {
        return request
          .get('/api/articles/5')
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.have.keys(...articleKeys);
            expect(article.title).to.equal(
              'UNCOVERED: catspiracy to bring down democracy'
            );
            expect(article.topic).to.equal('cats');
            expect(article.votes).to.equal(0);
            expect(article.comment_count).to.equal(2);
          });
      });
      it('status:404 if no article with given article_id exists', () => {
        return request.get('/api/articles/100').expect(404);
      });
      it('status:400 if invalid article_id is given', () => {
        return request.get('/api/articles/mitch').expect(400);
      });
    });
    describe('PATCH', () => {
      it('status:200 changes vote value and responds with updated article object', () => {
        return request
          .patch('/api/articles/5')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.votes).to.equal(1);
          });
      });
      it('status:200 can decrement a vote value', () => {
        return request
          .patch('/api/articles/5')
          .send({ inc_votes: -4 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.votes).to.equal(-4);
          });
      });
      it('status:200 ignores extra data', () => {
        return request
          .patch('/api/articles/5')
          .send({ inc_votes: -4, comment: 'your article is bad and you should feel bad' })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.votes).to.equal(-4);
          });
      });
      it('status:422 non-existent id', () => {
        return request
          .patch('/api/articles/100')
          .send({ inc_votes: 1 })
          .expect(422);
      });
      it('status:400 missing data', () => {
        return request
          .patch('/api/articles/5')
          .send({})
          .expect(400);
      });
      it('status:400 wrong data type', () => {
        return request
          .patch('/api/articles/5')
          .send({ inc_votes: 'wow, nice article, good job' })
          .expect(400);
      });
    });
    describe('disallowed methods', () => {
      it('status:405', () => {
        const methods = ['post', 'put', 'del'];
        return Promise.all(
          methods.map(method => {
            return request[method]('/api/articles/3').expect(405);
          })
        );
      });
    });
  });
  const commentKeys = [
    'comment_id',
    'votes',
    'created_at',
    'author',
    'body'
  ];
  describe('/:article_id/comments', () => {
    describe('GET', () => {
      it('status:200 responds with array of comment objects', () => {
        return request
        .get('/api/articles/5/comments')
        .expect(200)
        .then(({ body: { comments } }) => {
          comments.every(comment => expect(comment).to.have.keys(...commentKeys));
          expect(comments.length).to.equal(2);
        });
      });
    });
    describe('GET with queries', () => {
      //test
    });
    describe('POST', () => {
      //test
    });
  });
});

describe('/api/comments/:comment_id', () => {
  beforeEach(() => {
    return knex.seed.run();
  });
  describe('PATCH', () => {
    //test
  });
  describe('DELETE', () => {
    //test
  });
});

describe('/api', () => {
  describe('GET', () => {
    //test
  });
});
