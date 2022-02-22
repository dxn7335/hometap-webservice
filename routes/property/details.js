const axios = require('axios');

/* All Property Details */
const detailController = (req, res, next) => {
  const { query } = req;
  const { address, zipcode } = query;

  if (address && zipcode) {
    const addressString = address.replace(/\s/g, '+');
    axios
      .get(`https://api.housecanary.com/v2/property/details?address=${addressString}&zipcode=${zipcode}`)
      .then((resp) => {
        // parsing logic specific to House Canary API
        const propertyDetails = resp.data['property/details'].result;
        res.send(propertyDetails);
      });

  } else {
    res.status('400').json({ message: 'Address and Zipcode required'});
  }
};

module.exports = detailController;
