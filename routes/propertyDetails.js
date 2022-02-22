const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const axios = require('axios');

/* Property Details */
router.post('/', (req, res, next) => {
  const { body } = req;
  const { address, zipcode } = body;

  if (address && zipcode) {
    const addressString = address.replace(' ', '+');

    axios.get(`https://api.housecanary.com/v2/property/details?address=${addressString}&zipcode=${zipcode}`)
      .then((resp) => {
        // parsing logic specific to House Canary API
        console.log(resp);
        res.send(resp);
      });

  } else {
    res.status('400').json({ message: 'Address and Zipcode required'});
    //return next(createError(400, 'Address and Zipcode required'));
  }
});

module.exports = router;
