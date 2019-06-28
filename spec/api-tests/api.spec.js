const { expect } = require('chai');

module.exports = request => {
  describe('/', () => {
    describe('GET', () => {
      const endpoints = [
        'GET /api',
        'GET /api/topics',
        'GET /api/users/:username',
        'GET /api/articles',
        'GET /api/articles/:article_id',
        'PATCH /api/articles/:article_id',
        'GET /api/articles/:article_id/comments',
        'POST /api/articles/:article_id/comments',
        'GET /api/comments/:comment_id',
        'PATCH /api/comments/:comment_id',
        'DELETE /api/comments/:comment_id',
      ];
      it('status:200 responds with endpoints object', () => {
        return request
          .get('/api')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.have.keys(...endpoints);
          });
      });
    });
    describe('/badroute', () => {
      it('404 error on non-existent route (all methods)', () => {
        const methods = ['get', 'post', 'put', 'patch', 'del'];
        return Promise.all(
          methods.map(method => {
            return request[method]('/api/badroute')
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal('Not found');
              });
          })
        );
      });
    });
  });
};
