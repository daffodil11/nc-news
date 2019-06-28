# NC News (or, Have I Got NC for You?)

This is the backend for a website on which users can read articles, comment on articles and vote on articles and comments. This is a portfolio project and is not actively maintained.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
You will need to install [PostgreSQL](https://www.postgresql.org/) and start the PSQL server. If you are on a Linux-based OS, you will need to create a database user.

You will need to install Node. It is best to do this through [Node Version Manager](https://github.com/nvm-sh/nvm).

You will need to install mocha and knex globally on your system.

`npm install --global mocha knex`

### Installation
Clone this repository using git. Create a config.js in the root directory. If you are using a Mac OS, leave the file blank. If you are using a Linux-based OS, enter the following:
```javascript
exports.dbUsername = 'YOUR PSQL USERNAME HERE';
exports.dbPassword = 'YOUR PSQL PASSWORD HERE';
```

Install the dependencies.

`npm install`

## Testing
A suite of mocha BDD tests can be found in the spec folder. Within the spec folder is a sub-folder api-tests in which each of the major endpoints is tested in a separate file. `npm test` runs the main test file (`spec/app.spec.js`), which runs all of the files in api-tests.

## <a name='deployment'></a>Deployment
Firstly, ensure that your hosting solution supports Node and PostgreSQL. Next, create an application and push the repository to it.

Set up a PostgreSQL database server on the application. You should get a database connection URL. This project is set up to get the URL from Heroku's config values and set it to an environment variable (`DB_URL`). If you are using any hosting solution other than Heroku, you will need to change the three scripts ending in `:prod` in package.json accordingly.

## Built with
* Runtime environment: [node](https://nodejs.org/en/)
* Package manager: [npm](https://www.npmjs.com/)
* Web framework: [express](https://expressjs.com/)
* Testing framework: [mocha](https://mochajs.org/)
* Assertion library: [chai](https://www.chaijs.com/)
* Database: [PostgreSQL](https://www.postgresql.org/)
* SQL Query Builder: [KnexJS](https://knexjs.org/)

## Contributing
Wait, really?! You want to contribute? You know it's just a portfolio project, right? OK, open a PR if you like, and I'll take a look at it.

## Authors
Simon Davey

## License
This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details