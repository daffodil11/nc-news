const { fetchArticles, fetchArticleById, updateArticle, fetchArticleComments } = require('../models/articles');
const { addComment } = require('../models/comments');

exports.sendArticles = (req, res, next) => {
    fetchArticles(req.query)
    .then(articles => {
        return { articles, total_count: articles.length }
    })
    .then(resBody => {
        res.status(200).send(resBody);
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
    fetchArticleComments(article_id, req.query)
    .then(comments => {
        res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
    const { article_id } = req.params;
    addComment(article_id, req.body)
    .then(comment => {
        res.status(201).send({ comment });
    })
    .catch(next);
};