const { expect } = require('chai');

module.exports = (request, knex) => {
  describe('/comments/:comment_id', () => {
    const commentKeys = [
      'comment_id',
      'votes',
      'created_at',
      'author',
      'body',
      'article_id'
    ];
    describe('GET', () => {
      it('status:200 responds with a comment object', () => {
        return request
          .get('/api/comments/2')
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment).to.have.keys(commentKeys);
            expect(comment.body).to.equal(
              'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.'
            );
          });
      });
      it('status:404 non-existent comment_id', () => {
        return request.get('/api/comments/200').expect(404);
      });
      it('status:400 invalid comment_id', () => {
        return request.get('/api/comments/cats').expect(400);
      });
    });
    describe('PATCH', () => {
      afterEach(() => {
        return knex.seed.run();
      });
      it('status:200 responds with updated comment object', () => {
        return request
          .patch('/api/comments/2')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment).to.have.keys(commentKeys);
            expect(comment.comment_id).to.equal(2);
            expect(comment.votes).to.equal(15);
          });
      });
      it('status:200 ignores extra data', () => {
        return request
          .patch('/api/comments/2')
          .send({ inc_votes: 1, msg: 'Good comment!' })
          .expect(200)
          .then(({ body: { comment } }) => {
            expect(comment).to.have.keys(commentKeys);
            expect(comment.comment_id).to.equal(2);
            expect(comment.votes).to.equal(15);
          });
      });
      it('status:422 non-existent comment_id', () => {
        return request
          .patch('/api/comments/1000')
          .send({ inc_votes: 1 })
          .expect(422);
      });
      it('status:400 missing data', () => {
        return request
          .patch('/api/comments/2')
          .send({})
          .expect(400);
      });
      it('status:400 invalid data', () => {
        return request
          .patch('/api/comments/two')
          .send({})
          .expect(400);
      });
    });
    describe('DELETE', () => {
      afterEach(() => {
        return knex.seed.run();
      });
      it('status:204 no body on successful deletion', () => {
        return request
          .del('/api/comments/2')
          .expect(204)
          .then(() => {
            return request.get('/api/comments/2').expect(404);
          });
      });
      it('status:404 non-existent comment_id', () => {
        return request.del('/api/comments/200').expect(404);
      });
      it('status:400 invalid comment_id', () => {
        return request.del('/api/comments/cats').expect(400);
      });
    });
    describe('disallowed methods', () => {
      after(() => {
        return knex.seed.run();
      });
      it('status:405', () => {
        const methods = ['post', 'put'];
        return Promise.all(
          methods.map(method => {
            return request[method]('/api/comments/2').expect(405);
          })
        );
      });
    });
  });
};
