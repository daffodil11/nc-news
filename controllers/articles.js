const { fetchArticles, fetchArticleById, updateArticle, fetchArticleComments } = require('../models/articles');
const { addComment } = require('../models/comments');
const { paginate } = require('../db/utils/utils');

exports.sendArticles = (req, res, next) => {
    const { limit, p, ...query } = req.query;
    fetchArticles(query)
    .then(allArticles => {
        const articles = paginate(allArticles, limit, p);
        return { articles, total_count: allArticles.length };
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