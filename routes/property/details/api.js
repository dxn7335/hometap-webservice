const axios = require('axios');

/**
 * Outbound House Canary API details call
 * @param {object} params
 * @param {string} params.address
 * @param {string} params.zipcode
 * @param {Express Response} res
 * @return {Promise}
 */
const apiRequest = ({ address, zipcode }, res) => {
  if (address && zipcode) {
    const addressString = address.replace(/\s/g, '+');
    return axios
      .get(`https://api.housecanary.com/v2/property/details?address=${addressString}&zipcode=${zipcode}`)
      .then((resp) => {
        // parsing logic specific to House Canary API
        const propertyDetails = resp.data['property/details'].result;
        return Promise.resolve(propertyDetails);
      });
  } else {
    res.status('400').json({ message: 'Address and Zipcode required'});
  }
}

module.exports = apiRequest;