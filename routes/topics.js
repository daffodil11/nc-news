const router = require('express').Router();
const { sendTopics } = require('../controllers/topics');
const { send405Error } = require('../errors');

router.route('/').get(sendTopics).all(send405Error);

module.exports = router;