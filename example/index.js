var express = require('express')
var app = express()
var reload = require('../')

var path = __dirname + '/project'

app.use(reload(path))

app.listen(9000, () => console.log('Listening on 9000'))
