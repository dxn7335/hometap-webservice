const apiRequest = require('./api');

/* 
  Property Details
  ================
  Queries: (should be documented in swagger)

  address {string}
  zipcode {number}
*/
const detailSepticController = (req, res) => {
  const { query } = req;
  apiRequest(query, res).then((data) => {
      const { property } = data;
      res.send({
        hasSeptic: property.sewer === 'Septic',
        sewer: property.sewer,
      })
  });
};

module.exports = detailSepticController;
