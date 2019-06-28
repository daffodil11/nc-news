const router = require('express').Router();
const topicsRouter = require('./topics');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const commentsRouter = require('./comments');
const endpoints = require('../endpoints.json');
const { send405Error } = require('../errors');

router.route('/').get((req, res, next) => res.status(200).send(endpoints)).all(send405Error);
router.use('/topics', topicsRouter);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.use('/comments', commentsRouter);

module.exports = router;