const router = require('express').Router();
const { sendUserByUsername } = require('../controllers/users');

router.route('/:username').get(sendUserByUsername);

module.exports = router;