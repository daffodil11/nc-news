const knex = require('../connection');

exports.addComment = (article_id, { username, body }) => {
  return knex('comments')
    .insert({ article_id, author: username, body })
    .returning('*')
    .then(rows => {
      return rows[0];
    })
};