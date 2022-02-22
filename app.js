const express = require('express');

const indexRouter = require('./routes/index');

const app = express();

/**
 * Route Handling
 * ==============
 * All api routes here
 */
app.use('/', indexRouter);


module.exports = app;
