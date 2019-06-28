const chai = require('chai');
chai.use(require('chai-sorted'));
const { expect } = chai;

module.exports = (request, knex) => {
  const commentKeys = ['comment_id', 'votes', 'created_at', 'author', 'body'];
  describe('/articles/:article_id/comments', () => {
    describe('GET default behaviour', () => {
      it('status:200 responds with array of comment objects', () => {
        return request
          .get('/api/articles/5/comments')
          .expect(200)
          .then(({ body: { comments } }) => {
            comments.every(comment =>
              expect(comment).to.have.keys(commentKeys)
            );
            expect(comments.length).to.equal(2);
          });
      });
      it('status:200 responds with an empty array if an article has no comments', () => {
        return request
          .get('/api/articles/2/comments')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.deep.equal([]);
          });
      });
      it('status:200 default sort is created_at descending', () => {
        return request
          .get('/api/articles/5/comments')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.descendingBy('created_at');
          });
      });
      it('status:404 non-existent article_id', () => {
        return request.get('/api/articles/100/comments').expect(404);
      });
      it('status:400 invalid article_id', () => {
        return request.get('/api/articles/pizza/comments').expect(400);
      });
    });
    describe('GET with queries', () => {
      it('status:200 responds with array of comment objects sorted by specified value', () => {
        return request
          .get('/api/articles/1/comments?sort_by=votes')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.descendingBy('votes');
          });
      });
      it('status:200 ignores invalid query keys', () => {
        return request
          .get('/api/articles/1/comments?random=true')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.descendingBy('created_at');
          });
      });
      it('status:400 invalid sort_by value', () => {
        return request.get('/api/articles/1/comments?sort_by=age').expect(400);
      });
      it('status:200 responds with array of comment objects in specified order', () => {
        return request
          .get('/api/articles/1/comments?order=asc')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.ascendingBy('created_at');
          });
      });
      it('status:200 ignores any order other than asc or desc', () => {
        return request
          .get('/api/articles/1/comments?order=random')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.descendingBy('created_at');
          });
      });
      it('status:200 sort_by and order can be combined', () => {
        return request
          .get('/api/articles/1/comments?sort_by=votes&order=asc')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.ascendingBy('votes');
          });
      });
    });
    describe('POST', () => {
      afterEach(() => {
          return knex.seed.run();
      });
      it('status:201 responds with the created object', () => {
        return request
          .post('/api/articles/1/comments')
          .send({ username: 'lurker', body: 'Damn fine cup of coffee!' })
          .expect(201)
          .then(({ body: { comment } }) => {
            expect(comment).to.have.keys(...commentKeys, 'article_id');
            expect(comment.votes).to.equal(0);
            expect(comment.author).to.equal('lurker');
            expect(comment.body).to.equal('Damn fine cup of coffee!');
          });
      });
      it('status:400 only accepts comments from registered users', () => {
        return request
          .post('/api/articles/1/comments')
          .send({ username: 'nemo', body: 'Damn fine cup of coffee!' })
          .expect(400);
      });
      it('status:400 only accepts comments on an existing article', () => {
        return request
          .post('/api/articles/100/comments')
          .send({ username: 'lurker', body: 'Damn fine cup of coffee!' })
          .expect(404);
      });
      it('status:400 invalid article id', () => {
        return request
          .post('/api/articles/gaaaarrr/comments')
          .send({ username: 'lurker', body: 'Damn fine cup of coffee!' })
          .expect(400);
      });
      it('status:400 missing data', () => {
        return request
          .post('/api/articles/1/comments')
          .send({ username: 'lurker' })
          .expect(400);
      });
      it('status:201 ignores extra data', () => {
        return request
          .post('/api/articles/1/comments')
          .send({
            username: 'lurker',
            body: 'Damn fine cup of coffee!',
            greeting: 'Hello!'
          })
          .expect(201);
      });
    });
    describe('disallowed methods', () => {
      after(() => {
        return knex.seed.run();
      });
      it('status:405', () => {
        const methods = ['patch', 'put', 'del'];
        return Promise.all(
          methods.map(method => {
            return request[method]('/api/articles/3/comments').expect(405);
          })
        )
      });
    });
  });
};
