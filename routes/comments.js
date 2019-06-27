const {
  patchCommentVotes,
  removeComment,
  getCommentById
} = require('../controllers/comments');
const { send405Error } = require('../errors');
const router = require('express').Router();

router
  .route('/:comment_id')
  .get(getCommentById)
  .patch(patchCommentVotes)
  .delete(removeComment)
  .all(send405Error);

module.exports = router;
