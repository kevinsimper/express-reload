# express reload

Automaticly reload your express.js server without bringing down the server. This is really useful because it will hot reload instead of waiting for the whole node.js process to restart.

## Install

```
npm install express-reload --save-dev
```

Find it on https://www.npmjs.com/package/express-reload

## Example

```js
var express = require('express')
var reload = require('express-reload')
var app = express()

// path to reload
// important should end with "/" if index.js
var path = __dirname + '/project/'
// or like this for a non index.js name
var path = __dirname + '/project/server.js'

app.use(reload(path))

app.listen(9000, () => console.log('Listening on 9000'))

```
