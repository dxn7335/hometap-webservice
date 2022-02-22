const express = require('express');
const createError = require('http-errors');
const router = express.Router();

// sub-route controllers
const detailsController = require('./details/details');
const detailSepticController = require('./details/details-hasSeptic');
const detailsSepticController = require('./details/details-hasSeptic');

/* Sub Routes */
router.get('/details', detailsController);
router.get('/details/hasSeptic', detailSepticController);

module.exports = router;
