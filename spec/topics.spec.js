const { expect } = require('chai');
const { topicData } = require('../db');

module.exports = request => {
  describe('/topics', () => {
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
};
