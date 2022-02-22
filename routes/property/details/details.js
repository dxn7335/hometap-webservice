const apiRequest = require('./api');

/* 
  Property Details
  ================
  Queries: (should be documented in swagger)

  address {string}
  zipcode {number}
*/
const detailController = (req, res) => {
  const { query } = req;
  apiRequest(query, res).then((data) => res.send(data));
};

module.exports = detailController;
