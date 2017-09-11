const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const queries = require('../db/queries')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Existing user login
router.post('/login', (req, res) => {
  knex('user').where('user.username', req.body.username)
  .then(user => {
    if (user.length === 0) {
      res.json({error: 'Failed login attempt.'})
    } else {
      let match = bcrypt.compareSync(req.body.password, user[0].password)
      if (match) {
        let payload = user[0]
        delete payload.password
        let token = jwt.sign(payload, process.env.TOKEN_SECRET)
        res.json({token});
      } else {
        res.json({error: 'Failed login attempt.'})
      }
    }
  })
  .catch(error => res.json({error: 'Server error'}))
});

// New user signup
router.post('/signup', (req, res) => {
  if (validUser(req.body)) {
    knex('user').where('user.email', req.body.email).orWhere('user.username', req.body.username)
    .then(user => {
      if (user.length === 0) {
        let saltRounds = 10
        let hash = bcrypt.hashSync(req.body.password, saltRounds)
        req.body.password = hash
        knex('user').insert(req.body).returning('*')
        .then(newUser => {
          let payload = newUser[0]
          delete payload.password
          let token = jwt.sign(payload, process.env.TOKEN_SECRET)
          res.json({token});
        })
      } else {
        res.json({error: 'Failed signup attempt.'})
      }
    })
    .catch(error => res.json({error: 'Server error'}))
  } else {
    res.json({error: 'Failed signup attempt.'})
  }
});

// Validation
function validUser(user) {
  let email = user.email.match(/([@])/g) != null
  let username = user.username.trim() != ''
  let password = user.password.trim() != ''
  return email && username && password
};

module.exports = router
