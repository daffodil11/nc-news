const app = require('../app');
const request = require('supertest')(app);
const chai = require('chai');
chai.use(require('chai-sorted'));
const { expect } = chai;

describe('/api/topics', () => {
    describe('/', () => {
        describe('GET', () => {
            it('responds with status 200', () => {
                //test
            });
        });
    });
});

describe('/api/users/:username', () => {
    describe('GET', () => {
        //test
    })
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
        })
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