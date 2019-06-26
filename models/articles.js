const knex = require('../connection');

exports.fetchArticles = () => {
  return knex('articles')
    .select('articles.*')
    .count('comments.comment_id as comment_count')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id');
};

exports.fetchArticleById = article_id => {
    if (/\D/.test(article_id)) return Promise.reject({ status: 400, msg: 'Invalid article_id'});
    return this.fetchArticles().where('articles.article_id', '=', article_id).then(rows => {
        if (rows.length) return rows[0];
        else return Promise.reject({ status: 404, msg: 'Article not found'});
    });
};
