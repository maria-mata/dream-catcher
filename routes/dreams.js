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

// GET all dreams
router.get('/', (req, res) => {
  queries.getDreams()
    .then(dreams => {
      res.render('dreams', {dreams})
    })
})

// GET all dreams for one user by ID
router.get('/:id', (req, res) => {
  queries.getDreamsByUserId(req.params.id)
    .then(mydreams => {
      res.render('dreams', {mydreams}) // change to handlebars render later
    })
})

// POST a new dream
router.post('/', (req, res) => {
  queries.addDream(req.body)
    .then(() => {
      res.render('dreams', {message: 'Success!'})
    })
})

module.exports = router;
