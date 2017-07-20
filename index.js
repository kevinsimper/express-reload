var chokidar = require('chokidar')
var debug = require('debug')('express-reload')

module.exports = function(folder) {
  var watcher = chokidar.watch(folder)
  var re = new RegExp(folder + '[/]')
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing ' + folder + ' module cache from server')
      Object.keys(require.cache).forEach(function(id) {
        if (re.test(id)) delete require.cache[id]
      })
    })
  })
  return function (req, res, next) {
    require(folder)(req, res, next)
  }
}
