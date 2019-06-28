const { expect } = require('chai');
const { userData } = require('../db');

module.exports = request => {
  describe('/users/:username', () => {
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
};
