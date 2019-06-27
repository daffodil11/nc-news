const {
  patchCommentVotes,
  removeComment,
  getCommentById
} = require('../controllers/comments');
const router = require('express').Router();

router
  .route('/:comment_id')
  .get(getCommentById)
  .patch(patchCommentVotes)
  .delete(removeComment);

module.exports = router;
