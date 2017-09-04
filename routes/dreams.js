const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')

// GET dreams by ID
router.get('/', (req, res) => {
  queries.getDreamsByUserId(req.query.id)
    .then(data => {
      let dreams = []
      for (var i = 0; i < data.length; i++) {
        dreams.push(data[i])
        dreams[i].date = data[i].date.toString().substring(0, 16)
      }
      res.render('dreams', {dreams})
    })
});

// POST a new dream
router.post('/', (req, res) => {
  let dream = req.body
  dream.date = knex.raw('now()')
  queries.addDream(dream)
    .then(() => {
      res.json({message: 'Success!'})
    })
});

module.exports = router;
