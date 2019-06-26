const { fetchUserByUsername } = require('../models/users');

exports.sendUserByUsername = (req, res, next) => {
    const { username } = req.params;
    return fetchUserByUsername(username).then(([user]) => {
        res.status(200).send({ user });
    })
    .catch(next);
}