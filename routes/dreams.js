const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const queries = require('../db/queries')

// GET all dreams
router.get('/', (req, res) => {
  queries.getDreams()
  .then(dreams => {
    res.json(dreams)
  })
})

// GET all dreams for one user by ID
router.get('/:id', (req, res) => {
  queries.getDreamsByUserId(req.params.id)
  .then(dreams => {
    res.json(dreams) // change to handlebars render later
  })
});

// POST a new dream
router.post('/', (req, res) => {
  queries.addDream(req.body)
  .then(() => {
    res.json({message: 'Success!'})
  })
})

module.exports = router;
