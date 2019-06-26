const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const { handle500Errors, handleCustomErrors } = require('./errors');

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;