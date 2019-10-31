# express-reload

[![npm version](https://badge.fury.io/js/express-reload.svg)](https://badge.fury.io/js/express-reload)

Automatically reload your Express routers and middleware when their files change without restarting your Node process.

## Disclaimer
This is not intended for production use. Only use for development purposes. 

## Install

```
npm install express-reload --save-dev
```

Find it on https://www.npmjs.com/package/express-reload

## Example

```js
const express = require('express')
const reload = require('express-reload')
const app = express()

// reload when the router is the default export
app.use(reload('./path/to/router'))

// reload when the router is exported under another name
// module.exports = { router, otherFn, otherFn2 }
app.use(reload('./path/to/router', 'router'))

// use on non-error middleware as well
// function (req, res, next) {}
app.use(reload('./path/to/middleware'))

app.listen(9000, () => console.log('Listening on 9000'))
```
