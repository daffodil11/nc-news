process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const chai = require('chai');
chai.use(require('chai-sorted'));
const { expect } = chai;
const knex = require('../connection');
const { topicData } = require('../db');

beforeEach(() => {
  return knex.seed.run();
});

after(() => {
  return knex.destroy();
});

describe('/api/badroute', () => {
  it('responds with a 404 error', () => {
    const methods = ['get', 'post', 'put', 'patch', 'del'];
    return Promise.all(
      methods.map(method => {
        return request[method]('/api/badroute').expect(404);
      })
    );
  });
});

describe('/api/topics', () => {
  describe('GET', () => {
    it('responds with status 200', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics).to.deep.equal(topicData);
        });
    });
  });
  describe('disallowed methods', () => {
    it('responds with status 405', () => {
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
    it('responds with status 200', () => {
      return request
        .get('/api/users/butter_bridge')
        .expect(200)
        // Check response body here!
    });
  });
//   describe('disallowed methods', () => {
//     it('responds with status 405', () => {
//       const methods = ['post', 'patch', 'put', 'del'];
//       return Promise.all(
//         methods.map(method => {
//           return request[method]('/api/users/1').expect(405);
//         })
//       );
//     });
//   });
});

describe('/api/articles', () => {
  describe('/', () => {
    describe('GET', () => {
      //test
    });
  });
  describe('/:article_id', () => {
    describe('GET', () => {
      //test
    });
    describe('PATCH', () => {
      //test
    });
  });
  describe('/:article_id/comments', () => {
    describe('GET', () => {
      //test
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
