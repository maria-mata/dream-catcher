const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')
const jwt = require('jsonwebtoken')

// GET dreams by user ID
router.get('/', (req, res) => {
  let token = req.query.token
  let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  let id = decoded.id
  queries.getDreamsByUserId(id)
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
  let dream = req.body // make sure it's not empty (validate)
  dream.date = knex.raw('now()')
  queries.addDream(dream).then(() => res.json({message: 'Success!'}))
});

// GET dream by ID
router.get('/edit', (req, res) => {
  queries.getDreamById(req.query.dream).then(dream => res.render('edit', {dream}))
});

// EDIT dream
router.put('/', (req, res) => {
  queries.editDream(req.body.id, req.body).then(() => res.json({message: 'Success!'}))
});

// DELETE dream
router.delete('/', (req, res) => {
  queries.deleteDream(req.body.id).then(() => res.json({message: 'Success!'}))
});

module.exports = router;
