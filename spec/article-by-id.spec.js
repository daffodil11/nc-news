const { expect } = require('chai');

module.exports = (request, knex) => {
  const articleKeys = [
    'article_id',
    'title',
    'votes',
    'topic',
    'author',
    'created_at',
    'comment_count',
    'body'
  ];
  describe('/articles/:article_id', () => {
    describe('GET', () => {
      it('status:200 responds with article object', () => {
        return request
          .get('/api/articles/5')
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article).to.have.keys(articleKeys);
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
      afterEach(() => {
        return knex.seed.run();
      });
      it('status:200 changes vote value and responds with updated article object', () => {
        return request
          .patch('/api/articles/5')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article.votes).to.equal(1);
            expect(article).to.have.keys(articleKeys);
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
          .send({
            inc_votes: -4,
            comment: 'your article is bad and you should feel bad'
          })
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
      after(() => {
          return knex.seed.run();
      });
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
};
