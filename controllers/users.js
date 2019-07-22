const { fetchUserByUsername, fetchRandomUser } = require('../models/users');

exports.sendUserByUsername = (req, res, next) => {
    const { username } = req.params;
    return fetchUserByUsername(username).then(([user]) => {
        res.status(200).send({ user });
    })
    .catch(next);
}

exports.sendRandomUser = (req, res, next) => {
  return fetchRandomUser()
    .then(user => res.status(200).send({ user }))
    .catch(next);
}
