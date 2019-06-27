const knex = require('../connection');
const { fetchArticleById } = require('./articles');

exports.addComment = (article_id, { username, body }) => {
  if (!username || !body)
    return Promise.reject({ status: 400, msg: 'Bad Request: Missing data' });
  return fetchArticleById(article_id).then(() => {
    return knex('comments')
      .insert({ article_id, author: username, body })
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  });
};

exports.updateCommentVotes = (comment_id, { inc_votes }) => {
  if (!inc_votes || !Number.isInteger(inc_votes))
    return Promise.reject({ status: 400, msg: 'Bad request' });
  return knex('comments')
    .where('comment_id', '=', comment_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then(rows => {
      if (rows.length) return rows[0];
      else return Promise.reject({ status: 422, msg: 'Unprocessable: article_id not found'});
    });
};
