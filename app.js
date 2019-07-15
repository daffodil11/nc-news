const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const { handle500Errors, handleCustomErrors, handlePSQL400Errors } = require('./errors');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);
app.use('/*', (req, res, next) => res.status(404).send({ msg: 'Not found'}));

app.use(handleCustomErrors);
app.use(handlePSQL400Errors);
app.use(handle500Errors);

module.exports = app;
