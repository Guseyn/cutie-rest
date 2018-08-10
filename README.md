# cutie-rest
Cutie extension for using REST (based on cutie-http) in Node.

[![NPM Version][npm-image]][npm-url]

[Cutie](https://github.com/Guseyn/cutie) extension for fs module in Node. It's based on the [Async Tree Pattern](https://github.com/Guseyn/async-tree-patern/blob/master/Async_Tree_Patern.pdf).

# Usage

```js
const {
  // Needed async objects here from the table below
} = require('@guseyn/cutie-rest');
```
```js

'use strict'

const path = require('path');
const Backend = require('./../src/backend/Backend');
const RestApi = require('./../src/backend/api/RestApi');
const CachedServingFiles = require('./../src/backend/static/CachedServingFiles');
const GeneratedResponse = require('./GeneratedResponse');
const CustomNotFoundMethod = require('./CustomNotFoundMethod');

const notFoundMethod = new CustomNotFoundMethod(new RegExp(/\/not-found/));

const mapper = (url) => {
  let paths = url.split('/').filter(path => path !== '');
  return path.join(...paths);
}

new Backend(8080, '127.0.0.1', new RestApi(
  new GeneratedResponse(new RegExp(/\/response/), 'GET'),
  new CachedServingFiles(new RegExp(/\/files/), mapper, notFoundMethod),
  notFoundMethod
)).run();

```
[npm-image]: https://img.shields.io/npm/v/@guseyn/cutie-rest.svg
[npm-url]: https://npmjs.org/package/@guseyn/cutie-rest
