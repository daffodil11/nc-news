const { fetchArticles, fetchArticleById, updateArticle, fetchArticleComments } = require('../models/articles');

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

exports.patchArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    updateArticle(article_id, inc_votes)
    .then(article => {
        res.status(200).send({ article });
    })
    .catch(next);
};

exports.sendArticleComments = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticleComments(article_id)
    .then(comments => {
        res.status(200).send({ comments });
    })
    .catch(next);
};