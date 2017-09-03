const express = require('express')
const router = express.Router()

const knex = require('../db/knex')
const bcrypt = require('bcrypt')
const queries = require('../db/queries')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Existing user login
router.post('/login', (req, res) => {
  knex('user').where('user.username', req.body.username)
    .then(user => {
      let match = bcrypt.compareSync(req.body.password, user[0].password)
      if (user.length === 0 || !match) {
        res.json({error: 'Login failed.'})
      } else if (match) {
        router.get('/', (req, res) => {
          queries.getDreamsByUserId(user[0].id)
          .then(dreams => {
            res.render('dreams', {dreams})
          })
        })
        res.json({msg: 'Logged in'})
      }
    })
});

// New user signup
router.post('/signup', (req, res) => {
  knex('user').where('user.email', req.body.email)
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
        res.json({error: 'Signup failed.'})
      }
    })
});

module.exports = router
