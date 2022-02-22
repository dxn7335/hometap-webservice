const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const propertyRouter = require('./routes/property/');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Route Handling
 * ==============
 * All api routes here
 */
app.use('/', indexRouter);
app.use('/property', propertyRouter);


module.exports = app;
