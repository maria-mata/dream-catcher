const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// GET dreams by user ID
router.get('/', (req, res) => {
  let token = req.query.token
  let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  let id = decoded.id
  if (isNaN(id)) {
    res.json({error: 'Invalid token.'})
  } else {
    queries.getDreamsByUserId(id)
    .then(data => {
      let dreams = []
      for (var i = 0; i < data.length; i++) {
        dreams.push(data[i])
        dreams[i].date = data[i].date.toString().substring(0, 16)
      }
      res.render('dreams', {dreams})
    })
    .catch(error => res.json({error: 'Server error'}))
  }
});

// POST a new dream
router.post('/', (req, res) => {
  let dream = req.body
  if (validDream(dream)) {
    dream.date = knex.raw('now()')
    queries.addDream(dream)
    .then(() => res.json({message: 'Success!'}))
    .catch(error => res.json({error: 'Server error'}))
  } else {
    res.json({error: 'Invalid user input.'})
  }
});

// GET dream by ID
router.get('/edit', (req, res) => {
  let token = req.query.token
  let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  let id = decoded.id
  if (isNaN(id)) {
    res.json({error: 'Invalid token.'})
  } else {
    queries.getDreamById(req.query.dream)
    .then(dream => res.render('edit', {dream}))
    .catch(error => res.json({error: 'Server error'}))
  }
});

// EDIT dream
router.put('/', (req, res) => {
  let dream = req.body
  if (validDream(dream)) {
    queries.editDream(req.body.id, dream)
    .then(() => res.json({message: 'Success!'}))
    .catch(error => res.json({error: 'Server error'}))
  } else {
    res.json({error: 'Invalid user input.'})
  }
});

// DELETE dream
router.delete('/', (req, res) => {
  queries.deleteDream(req.body.id)
  .then(() => res.json({message: 'Success!'}))
  .catch(error => res.json({error: 'Server error'}))
});

// Validation
function validDream(dream) {
  let description = dream.description.trim() != ''
  let user = dream.user_id.trim() != '' && !isNaN(dream.user_id)
  let category = dream.category_id.trim() != '' && !isNaN(dream.category_id)
  return description && user && category
};

module.exports = router;
