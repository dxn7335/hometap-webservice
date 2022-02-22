const path = require('path');
const createError = require('http-errors');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const applyConfig = (app) => {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    return next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  // Mocking data for dev purposes
  if (process.env.ENVIRONMENT === 'dev') {
    // Intercept outbound calls and use the path to return correct mock data
    axios.interceptors.request.use(req => {
      const url = new URL(req.url);
      const routepath = url.pathname.split('/v2/')[1];
      return {
          ...req,
          url: `/mocks/${routepath}/`,
      };
    });

    axios.interceptors.response.use((resp) => {
      return resp;
    }, (error) => {
      const mockData = require(`.${error.config.url}/mockdata.json`);
      return Promise.resolve({
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: error.config.headers,
        config: error.config,
      });
    });
  }
}

module.exports = applyConfig;
