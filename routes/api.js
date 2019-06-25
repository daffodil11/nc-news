const router = require('express').Router();
const topicsRouter = require('./topics');
const usersRouter = require('./users');

router.use('/topics', topicsRouter);
router.use('/users', usersRouter);

module.exports = router;