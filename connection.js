const ENV = process.env.NODE_ENV || 'development';
const types = require('pg').types;
types.setTypeParser(20, 'text', parseInt);
const Knex = require('knex');
const herokuConfig = {
    client: 'pg',
    connection: process.env.DATABASE_URL
};
const config = (ENV === 'production') ? herokuConfig : require('./knexfile');

module.exports = Knex(config);