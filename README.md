# cutie-rest

[![NPM Version](https://img.shields.io/npm/v/@cuties/rest.svg)](https://npmjs.org/package/@cuties/rest)
[![Build Status](https://travis-ci.org/Guseyn/cutie-rest.svg?branch=master)](https://travis-ci.org/Guseyn/cutie-rest)
[![codecov](https://codecov.io/gh/Guseyn/cutie-rest/branch/master/graph/badge.svg)](https://codecov.io/gh/Guseyn/cutie-rest)

[Cutie](https://github.com/Guseyn/cutie) extension for using REST (based on [cutie-http](https://github.com/Guseyn/cutie-http)) in Node. It's based on the [Async Tree Pattern](https://github.com/Guseyn/async-tree-patern/blob/master/Async_Tree_Patern.pdf).

## Install

`npm install @cuties/rest`

## Run test

`npm test`

## Run build

`npm run build`

## Run example

`npm run example`

## Run procedural example

`npm run procedural-example`

## Usage

```js
const {
  // Needed async objects here from the table below
} = require('@cuties/rest')
```

This library provides following objects: `Backend, RestApi, RequestBody, CreatedServingFilesEndpoint, CreatedCachedServingFilesEndpoint, ServingFiles, CachedServingFiles` and `Endpoint, NotFoundEndpoint, IndexEndpoint, InternalServerErrorEndpoint` interfaces.

| Object | Parameters(type) | Description |
| ------ | -----------| ----------- |
| `Backend` | `protocol, port(number), host(string), api(RestApi)[, options]`| It's `AsyncObject`. It Declares backend server with `protocol`(`http` or `https`) on specified `port` and `host`, also it provides declared `api` (REST). `options` is for options of the http/https server(it's optional).|
| `RestApi` | `...endpoints`(classes that extend `Endpoint`) | Represents request-response listener. Declares endpoints of api. |
| `RequestBody` | `request` | Reads body of `request` in `body(request, response)` method of `Endpoint` implementation |
| `Endpoint` | `regexp(RegExp), method(string)[, ...args]` | Declares an endpoint(in api) with url that matches `regexp` and specified `method`('GET', 'POST', etc.). Also it's possible to pass some custom arguments via `...args`. This class has a method `body(request, response[, ...args])` that needs to be overridden and must return async object.|
| `CreatedServingFilesEndpoint` | `regexp (RegExp or AsyncObject that represents RegExp), mapper (function(url) or AsyncObject that represents mapper function), notFoundEndpoint(Endpoint or AsyncObject that represents Endpoint)` | `AsyncObject` that represents `ServingFilesEndpoint` |
| `CreatedCachedServingFilesEndpoint` | `regexp (RegExp or AsyncObject that represents RegExp), mapper (function(url) or AsyncObject that represents mapper function), notFoundEndpoint(Endpoint or AsyncObject that represents Endpoint)` | `AsyncObject` that represents `CachedServingFilesEndpoint` |
| `ServingFilesEndpoint` | `regexp (RegExp), mapper (function(url)`), `notFoundEndpoint(Endpoint)` | Extends `Endpoint` and serves files on url that mathes `regexp` with `mapper` function that gets location of a file on a disk by the url. Also it's required to declare `notFoundEndpoint` that handles the cases when a file is not found. |
| `CachedServingFilesEndpoint` | `regexp(RegExp), mapper(function(url)), notFoundEndpoint(Endpoint)` | Does the same that `ServingFilesEndpoint` does and caches files for increasing speed of serving them. |
| `IndexEndpoint` | no args | `Endpoint` that is used for representing index page. |
| `NotFoundEndpoint` | `regexp(RegExp)` | `Endpoint` that is used in `RestApi, ServingFilesEndpoint, CachedServingFilesEndpoint` for declaring endpoint on 404(NOT_FOUND) status. |
| `InternalServerErrorEndpoint` | no args | `Endpoint` that is used for handling underlying internal failure(not for user error). |

## Example

```js
'use strict'

const path = require('path')
const {
  Backend,
  RestApi,
  CreatedServingFilesEndpoint,
  CreatedCachedServingFilesEndpoint
} = require('@cuties/rest');
const {
  CreatedOptions
} = require('@cuties/https')
const { ReadDataByPath } = require('@cuties/fs')
const SimpleResponseOnGETRequest = require('./example/SimpleResponseOnGETRequest')
const SimpleResponseOnPOSTRequest = require('./example/SimpleResponseOnPOSTRequest')
const CustomNotFoundEndpoint = require('./example/CustomNotFoundEndpoint')
const CustomInternalServerErrorEndpoint = require('./example/CustomInternalServerErrorEndpoint')
const CustomIndexEndpoint = require('./example/CustomIndexEndpoint')

const notFoundEndpoint = new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
const internalServerErrorEndpoint = new CustomInternalServerErrorEndpoint()

const mapper = (url) => {
  let parts = url.split('/').filter(part => part !== '')
  return path.join(...parts)
}

const cacheMapper = (url) => {
  let parts = url.split('/').filter(part => part !== '').slice(1)
  parts.unshift('files')
  return path.join(...parts)
}

new Backend(
  'https', 
  8000, 
  '127.0.0.1',
  new RestApi(
    new CustomIndexEndpoint(),
    new SimpleResponseOnGETRequest(new RegExp(/^\/get/), 'GET'),
    new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
    new CreatedServingFilesEndpoint(new RegExp(/^\/files/), mapper, notFoundEndpoint),
    new CreatedCachedServingFilesEndpoint(new RegExp(/^\/cached/), cacheMapper, notFoundEndpoint),
    notFoundEndpoint,
    internalServerErrorEndpoint
  ), new CreatedOptions(
    'key', new ReadDataByPath('./example/pem/key.pem'),
    'cert', new ReadDataByPath('./example/pem/cert.pem')
  )
).call()


```

## CustomIndexEndpoint

```js
'use strict'

const { IndexEndpoint } = require('@cuties/rest')

class CustomIndexEndpoint extends IndexEndpoint {
  constructor () {
    super()
  }

  body (request, response) {
    return super.body(request, response)
  }
}

module.exports = CustomIndexEndpoint


```

[IndexEndpoint](https://github.com/Guseyn/cutie-rest/blob/master/src/backend/endpoint/IndexEndpoint.js)

## CustomNotFoundEndpoint

```js
'use strict'

const { NotFoundEndpoint } = require('@cuties/rest')

class CustomNotFoundEndpoint extends NotFoundEndpoint {
  constructor (regexpUrl) {
    super(regexpUrl)
  }

  body (request, response) {
    return super.body(request, response)
  }
}

module.exports = CustomNotFoundEndpoint

```
[NotFoundEndpoint](https://github.com/Guseyn/cutie-rest/blob/master/src/backend/endpoint/NotFoundEndpoint.js)

## SimpleResponseOnGETRequest

```js
'use strict'

const {
  Endpoint
} = require('@cuties/rest')
const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http')

class SimpleResponseOnGETRequest extends Endpoint {
  constructor (regexpUrl, type) {
    super(regexpUrl, type)
  }

  body (request, response) {
    return new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok', {
            'Content-Type': 'text/plain'
          }
        ), 'content'
      ), ' is delivered'
    )
  }
}

module.exports = SimpleResponseOnGETRequest

```

## SimpleResponseOnPOSTRequest

```js
'use strict'

const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http')
const {
  Endpoint,
  RequestBody
} = require('@cuties/rest')

class SimpleResponseOnPOSTRequest extends Endpoint {
  constructor (regexpUrl, type) {
    super(regexpUrl, type)
  }

  body (request, response) {
    // request also contains body(as buffer), use RequestBody object for that
    return new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok', {
            'Content-Type': 'text/plain'
          }
        ), new RequestBody(request)
      ), ' is delivered'
    )
  }
}

module.exports = SimpleResponseOnPOSTRequest

```

## CustomInternalServerErrorEndpoint

```js
'use strict'

const { InternalServerErrorEndpoint } = require('@cuties/rest')

class CustomInternalServerErrorEndpoint extends InternalServerErrorEndpoint {
  constructor () {
    super()
  }

  body (request, response, error) {
    return super.body(request, response, error)
  }
}

module.exports = CustomInternalServerErrorEndpoint

```
[InternalServerErrorEndpoint](https://github.com/Guseyn/cutie-rest/blob/master/src/backend/endpoint/InternalServerErrorEndpoint.js)
