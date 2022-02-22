const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', (req, res, next) => {
  const { params } = req;
  if (params.address && params.zipcode) {

  } else {
    return next(createError(400, 'Address annd Zipcode required'));
  }
});

module.exports = router;
