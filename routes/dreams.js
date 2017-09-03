const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')

// GET dream types
router.get('/', (req, res) => {
  queries.getCategories()
    .then(dreamTypes => {
      res.render('dreams', {dreamTypes})
    })
});

// POST a new dream
router.post('/', (req, res) => {
  queries.addDream(req.body)
    .then(() => {
      res.render('dreams', {message: 'Success!'})
    })
})

module.exports = router;
