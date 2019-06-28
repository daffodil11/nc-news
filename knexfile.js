const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';
const { dbUsername, dbPassword } = require('./config');

const connections = {
  development: {
    database: 'nc_news',
    username: dbUsername,
    password: dbPassword
  },
  test: {
    database: 'nc_news_test',
    username: dbUsername,
    password: dbPassword
  },
  production: `${DB_URL}?ssl=true`
}

module.exports = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  connection: connections[ENV]
};