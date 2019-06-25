const knex = require('../connection');

exports.fetchUserByUsername = username => {
    return knex('users').select('*').where('username', '=', username);
}