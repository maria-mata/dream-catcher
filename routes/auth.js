const express = require('express')
const router = express.Router()

const knex = require('../db/knex')
const bcrypt = require('bcrypt')
const queries = require('../db/queries')
const jwt = require('jsonwebtoken')
require('dotenv').config()
