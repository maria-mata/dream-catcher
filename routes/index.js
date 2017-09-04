const express = require('express');
const router = express.Router();
const queries = require('../db/queries')

/* GET home page. */
router.get('/', function(req, res) {
  // queries.getCategories()
  //   .then(dreamTypes => {
  //     res.render('index', {dreamTypes})
  //   })
  res.render('index')
});

module.exports = router;
