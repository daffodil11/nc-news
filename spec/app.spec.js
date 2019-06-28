process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const chai = require('chai');
chai.use(require('chai-sorted'));
const { expect } = chai;
const knex = require('../connection');
const { topicData, userData } = require('../db');
const testTopics = require('./topics.spec');
const testApi = require('./api.spec');
const testUsersUsername = require('./users.spec');
const testArticles = require('./articles.spec');
const testArticlesArticleId = require('./article-by-id.spec');
const testArticleComments = require('./article-comments.spec');
const testCommentsCommentId = require('./comment-by-id.spec');

describe.only('/api', () => {
  after(() => {
    return knex.destroy();
  });
  before(() => {
    return knex.seed.run();
  });

  testApi(request);
  testTopics(request);
  testUsersUsername(request);
  testArticles(request);
  testArticlesArticleId(request, knex);
  testArticleComments(request, knex);
  testCommentsCommentId(request, knex);
});
