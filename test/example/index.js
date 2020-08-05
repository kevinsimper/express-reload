var express = require('express')
var app = express()
var reload = require('../../src')


var pathMain = __dirname + '/main/notindex'
app.use(reload(pathMain))


var pathProject = __dirname + '/project/'
app.use('/project', reload(pathProject))

const server = app.listen(9000, () => console.log('Listening on 9000'))

module.exports = server;