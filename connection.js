const types = require('pg').types;
types.setTypeParser(20, 'text', parseInt);
const Knex = require('knex');
const config = require('./knexfile');

module.exports = Knex(config);