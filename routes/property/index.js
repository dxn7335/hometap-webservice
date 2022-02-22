const express = require('express');
const createError = require('http-errors');
const router = express.Router();

// sub-route controllers
const detailsController = require('./details');

/* Sub Routes */
router.get('/details', detailsController);

module.exports = router;
