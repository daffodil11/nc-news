const ENV = process.env.NODE_ENV || 'development';
const { dbUsername, dbPassword } = require('./config');

const databases = {
  development: 'nc_news',
  test: 'nc_news_test'
}

module.exports = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  connection: {
    database: databases[ENV],
    username: dbUsername,
    password: dbPassword
  }
};