const router = require('express').Router();
const { sendArticles, sendArticle } = require('../controllers/articles');
const { send405Error } = require('../errors');

router.route('/').get(sendArticles).all(send405Error);

router.route('/:article_id').get(sendArticle);

module.exports = router;