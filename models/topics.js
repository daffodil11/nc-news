const knex = require('../connection');

exports.fetchTopics = () => {
    return knex('topics').select('*');
}