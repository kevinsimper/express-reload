var chokidar = require('chokidar')
var debug = require('debug')('express-reload')
var path = require('path')

module.exports = function(folder) {
  debug('Folder to require and watch', folder)
  let rootFolder = folder
  if(folder.charAt(folder.length - path.sep.length) !== path.sep) {
    debug('Testing if the folder is a folder')
    rootFolder = path.dirname(folder).replace(new RegExp('\\' + path.sep, 'g'), '/')
  }
  var watcher = chokidar.watch(rootFolder)
  var re = new RegExp(rootFolder)
  debug('regex created', re)
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log('Clearing ' + rootFolder + ' module cache from server')
      Object.keys(require.cache).forEach(function(id) {
        if (re.test(id.replace(new RegExp('\\' + path.sep, 'g'), '/'))) {
          debug('deleting cache key')
          delete require.cache[id]
        }
      })
    })
  })
  require(folder)
  return function(req, res, next) {
    debug('require hot reload')
    require(folder)(req, res, next)
  }
}
