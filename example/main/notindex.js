var express = require('express')
var app = express.Router()

app.get('/', (req, res) => {
  res.send('Hello World Not called index.js 1')
})

module.exports = app
