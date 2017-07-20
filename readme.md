# express reload

Automaticly reload your express.js server without bringing down the server. This is really useful because it will hot reload instead of waiting for the whole node.js process to restart.

## Example

```js
var express = require('express')
var reload = require('express-reload')
var app = express()

// path to reload
var path = __dirname + '/project'

app.use(reload(path))

app.listen(9000, () => console.log('Listening on 9000'))

```
