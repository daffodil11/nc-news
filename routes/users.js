const router = require('express').Router();
const { sendUserByUsername, sendRandomUser } = require('../controllers/users');
const { send405Error } = require('../errors');

router.route('/randomuser').get(sendRandomUser).all(send405Error);
router.route('/u/:username').get(sendUserByUsername).all(send405Error);

module.exports = router;
