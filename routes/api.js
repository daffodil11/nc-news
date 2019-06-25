const router = require('express').Router();
const topicsRouter = require('./topics');

router.use('/topics', topicsRouter);

module.exports = router;