const router = require('express').Router();
const { sendUserById } = require('../controllers/users');

router.route('/:username')
.get(sendUserById);

module.exports = router;