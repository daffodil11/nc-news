const { fetchArticles, fetchArticleById } = require('../models/articles');

exports.sendArticles = (req, res, next) => {
    fetchArticles()
    .then(articles => {
        res.status(200).send({ articles });
    })
    .catch(next);
}

exports.sendArticle = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticleById(article_id)
    .then(article => {
        res.status(200).send({ article });
    })
    .catch(next);
};