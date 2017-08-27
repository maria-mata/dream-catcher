const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')

// GET all dream categories
router.get('/', (req, res) => {
  queries.getCategories()
    .then(categories => {
      res.json(categories)
    })
})

module.exports = router;
