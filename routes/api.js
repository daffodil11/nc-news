const router = require('express').Router();
const topicsRouter = require('./topics');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const commentsRouter = require('./comments');

router.use('/topics', topicsRouter);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use('/comments', commentsRouter);

module.exports = router;