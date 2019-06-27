const { patchCommentVotes } = require('../controllers/comments');
const router = require('express').Router();

router.route('/:comment_id').patch(patchCommentVotes);

module.exports = router;