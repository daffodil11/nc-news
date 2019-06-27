const knex = require('../connection');
const { fetchArticleById } = require('./articles');

exports.addComment = (article_id, { username, body }) => {
  if (!username || !body) return Promise.reject({status: 400, msg: 'Bad Request: Missing data'})
  return fetchArticleById(article_id).then(() => {
    return knex('comments')
      .insert({ article_id, author: username, body })
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  });
};
