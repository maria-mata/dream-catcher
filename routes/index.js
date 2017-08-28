const express = require('express');
const router = express.Router();
const queries = require('../db/queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  queries.getCategories()
    .then(dreamTypes => {
      res.render('index', {dreamTypes})
    })
});

module.exports = router;
