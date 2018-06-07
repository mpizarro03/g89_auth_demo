const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/', function(req, res, next) {
  res.render('login', { errorMessage: '' })
})

router.post('/', function (req, res, next) {
  const username = req.body.username
  const password = req.body.password

  if (username && password) {
    knex('users')
      .where('username', username)
      .then((result) => {
        if (result.length !== 1) {
          res.status(400).send(JSON.stringify({ message: 'Bad username'}))
        }
        else if (bcrypt.compareSync(password, result[0].password)) {
          res.status(200).send(JSON.stringify({ message: 'You HACK THE GIBSON'}))
        }
        else {
          res.status(400).send(JSON.stringify({ message: 'Bad password'}))
        }
      })
  }
  else {
    res.status(400).send(JSON.stringify({ message: 'Must username and password'}))
  }
})

module.exports = router
