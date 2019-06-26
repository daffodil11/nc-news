const router = require('express').Router();
const {
  sendArticles,
  sendArticle,
  patchArticle,
  sendArticleComments
} = require('../controllers/articles');
const { send405Error } = require('../errors');

router
  .route('/')
  .get(sendArticles)
  .all(send405Error);

router
  .route('/:article_id')
  .get(sendArticle)
  .patch(patchArticle)
  .all(send405Error);

router.route('/:article_id/comments').get(sendArticleComments);

module.exports = router;
