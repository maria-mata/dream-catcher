const express = require('express')
const router = express.Router()

const knex = require('../db/knex')
// const bcrypt = require('bcrypt')
const queries = require('../db/queries')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// New user signup
// router.post('/signup', (req, res) => {
//   // validate unique email
//   knex('users').where('email', req.body.email)
//     .then(user => {
//       if (user.length === 0) {
//         // first hash the password
//         let saltRounds = 10
//         let hash = bcrypt.hashSync(req.body.password, saltRounds)
//         req.body.password = hash
//         // insert user with hashed PW into database
//         knex('users').insert(req.body).returning('*')
//           .then(newUser => {
//             let payload = newUser[0] // comes back as an array of 1
//             delete payload.password // don't send the hashed PW to the front end
//             let token = jwt.sign(payload, process.env.TOKEN_SECRET)
//             res.json({token});
//           })
//       } else {
//         res.json({error: 'Email already in use.'})
//       }
//     })
// });

// Existing user login

module.exports = router
