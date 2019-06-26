const router = require('express').Router();
const { sendUserByUsername } = require('../controllers/users');
const { send405Error } = require('../errors');

router.route('/:username').get(sendUserByUsername).all(send405Error);

module.exports = router;