const knex = require('../connection');
const { validateOrderKey } = require('../db/utils/utils');
const { fetchTopics } = require('./topics');
const { fetchUsers } = require('./users');

const _fetchArticles = columns => {
  return knex('articles')
    .select(...columns)
    .count('comments.comment_id as comment_count')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id');
};

exports.fetchArticles = ({ sort_by, order, author, topic }) => {
  const columns = [
    'article_id',
    'topic',
    'title',
    'author',
    'votes',
    'created_at'
  ].map(col => `articles.${col}`);
  const orderKey = sort_by
    ? `${sort_by === 'comment_count' ? '' : 'articles.'}${sort_by}`
    : 'articles.created_at';
  const sortOrder = order === 'asc' ? 'asc' : 'desc';
  return validateOrderKey(orderKey, [...columns, 'comment_count'])
    .then(() => {
      const checks = [];
      if (topic) {
        checks.push(
          fetchTopics().then(topics => {
            const slugs = topics.map(topic => topic.slug);
            if (!slugs.includes(topic))
              return Promise.reject({
                status: 400,
                msg: 'Bad request: Topic not found'
              });
          })
        );
      }
      if (author) {
        checks.push(
          fetchUsers().then(users => {
            const usernames = users.map(user => user.username);
            if (author && !usernames.includes(author))
              return Promise.reject({
                status: 400,
                msg: 'Bad request: Author not found'
              });
          })
        );
      }
      return Promise.all(checks);
    })
    .then(() => {
      return _fetchArticles(columns)
        .orderBy(orderKey, sortOrder)
        .modify(query => {
          if (author) query.where('articles.author', '=', author);
          if (topic) query.where('articles.topic', '=', topic);
        });
    });
};

const _fetchArticleById = article_id => {
  const columns = [
    'article_id',
    'topic',
    'title',
    'author',
    'votes',
    'created_at',
    'body'
  ].map(col => `articles.${col}`);
  if (/\D/.test(article_id)) {
    return Promise.reject({ status: 400, msg: 'Invalid article_id' });
  }
  return _fetchArticles(columns).where('articles.article_id', '=', article_id);
};

exports.fetchArticleById = article_id => {
  return _fetchArticleById(article_id).then(rows => {
    if (rows.length) return rows[0];
    else return Promise.reject({ status: 404, msg: 'Article not found' });
  });
};

exports.updateArticle = (article_id, inc_votes) => {
  if (!inc_votes || !Number.isInteger(inc_votes))
    return Promise.reject({ status: 400, msg: 'Bad request' });
  return knex('articles')
    .where('articles.article_id', '=', article_id)
    .increment('votes', inc_votes)
    .then(() => {
      return _fetchArticleById(article_id);
    })
    .then(rows => {
      if (rows.length) return rows[0];
      else
        return Promise.reject({
          status: 422,
          msg: 'Unprocessable: article_id not found'
        });
    });
};

exports.fetchArticleComments = (article_id, { sort_by, order }) => {
  if (/\D/.test(article_id)) {
    return Promise.reject({ status: 400, msg: 'Invalid article_id' });
  }
  const columns = ['comment_id', 'author', 'votes', 'created_at', 'body'].map(
    col => `comments.${col}`
  );
  const orderKey = sort_by ? `comments.${sort_by}` : 'comments.created_at';
  const sortOrder = order === 'asc' ? 'asc' : 'desc';
  return validateOrderKey(orderKey, columns)
    .then(() => {
      return knex('articles')
        .select(...columns)
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .where('articles.article_id', '=', article_id)
        .orderBy(orderKey, sortOrder);
    })
    .then(rows => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: 'Not found' });
      else if (Object.values(rows[0]).every(val => val == null)) return [];
      else return rows;
    });
};
