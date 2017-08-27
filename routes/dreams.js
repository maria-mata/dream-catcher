const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const queries = require('../db/queries')

// GET all dreams for one user by ID
router.get('/:id', (req, res) => {
  queries.getDreamsByUserId(req.params.id)
  .then(dreams => {
    res.json(dreams) // change to handlebars render later
  })
});

module.exports = router;
