const knex = require('../connection');

exports.fetchUserByUsername = username => {
  return knex('users')
    .select('*')
    .where('username', '=', username)
    .then(rows => {
        if (rows.length) return rows;
        else return Promise.reject({status: 404, msg: 'User not found'});
    });
};

exports.fetchUsers = () => {
    return knex('users').select('*');
};

exports.fetchRandomUser = () => {
  return this.fetchUsers()
    .then(userArr => userArr[Math.floor(Math.random() * userArr.length)]);
}
