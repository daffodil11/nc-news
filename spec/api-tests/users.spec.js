const { expect } = require('chai');
const { userData } = require('../../db');

module.exports = request => {
  describe('/users/randomuser', () => {
    describe('GET', () => {
      it('status 200', () => {
        return request
          .get('/api/users/randomuser')
          .expect(200)
          .then(({ body: { user } }) => {
            console.log(user);
            expect(user).to.have.keys('username', 'name', 'avatar_url');
          });
      });
    });
    describe('disallowed methods', () => {
      it('status:405', () => {
        const methods = ['post', 'patch', 'put', 'del'];
        return Promise.all(
          methods.map(method => {
            return request[method]('/api/users/randomuser').expect(405);
          })
        );
      });
    });
  });
  describe('/users/:username', () => {
    describe('GET', () => {
      it('status:200', () => {
        return request
          .get('/api/users/u/butter_bridge')
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).to.deep.equal(
              userData.find(user => user.username === 'butter_bridge')
            );
          });
      });
      it('status:404 if the user does not exist', () => {
        return request.get('/api/users/u/nemo').expect(404);
      });
    });
    describe('disallowed methods', () => {
      it('status:405', () => {
        const methods = ['post', 'patch', 'put', 'del'];
        return Promise.all(
          methods.map(method => {
            return request[method]('/api/users/u/butter_bridge').expect(405);
          })
        );
      });
    });
  });
};
