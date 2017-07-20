var express = require('express')
var app = express.Router()

app.get('/', (req, res) => {
  res.send('Hello World reloader 7')
})

module.exports = app
