const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.stack);
  res.render('index', { title: 'Intermediary Service' });
});

module.exports = router;
