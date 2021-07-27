# cutie-rest

[![NPM Version](https://img.shields.io/npm/v/@cuties/rest.svg)](https://npmjs.org/package/@cuties/rest)
[![Build Status](https://travis-ci.com/Guseyn/cutie-rest.svg?branch=master)](https://travis-ci.com/Guseyn/cutie-rest)
[![codecov](https://codecov.io/gh/Guseyn/cutie-rest/branch/master/graph/badge.svg)](https://codecov.io/gh/Guseyn/cutie-rest)

[Cutie](https://github.com/Guseyn/cutie) extension for using REST (based on [cutie-http](https://github.com/Guseyn/cutie-http) and [cutie-https](https://github.com/Guseyn/cutie-https)) in Node. It's based on the [Async Tree Pattern](https://github.com/Guseyn/async-tree-patern/blob/master/Async_Tree_Patern.pdf).

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

This library provides following objects: `Backend, RestApi, RequestBody, CreatedServingFilesEndpoint, CreatedCachedServingFilesEndpoint, ServingFiles, CachedServingFiles, CORSEndpoint` and `Endpoint, NotFoundEndpoint, IndexEndpoint, InternalServerErrorEndpoint` interfaces.

| Object | Parameters(type) | Description |
| ------ | -----------| ----------- |
| `Backend` | `protocol, port(number), host(string), api(RestApi)[, options]`| It's `AsyncObject`. It Declares backend server with `protocol`(`http` or `https`) on specified `port` and `host`, also it provides declared `api` (REST). `options` is for options of the http/https server(it's optional).|
| `ClusteredBackendWith505ErrorEvent` | `domain, cluster, errorEvent, protocol, port, host, api[, options[, numberOfForks]]` | It's `AsyncObject`. It declares backend which based on clusters (Cluster API from Node.js) and also provides a way to handle any uncaught exceptions in the program via Domain module in Node(will be replace with other alternative solution from Node once it's released). For more details check [example below](#example-of-using-clustered-backend). |
| `RestApi` | `...endpoints`(classes that extend `Endpoint`) | Represents request-response listener. Declares endpoints of api. |
| `RequestBody` | `request` | Reads body of `request` in `body(request, response)` method of `Endpoint` implementation |
| `RequestParams` | `request` | Reads params of `request` in `body(request, response)` method of `Endpoint` implementation |
| `RequestWithProgress` | `request, response[, totalLengthHeaderName('content-length' by default)]` | Send progress to client via `response.write` while loading request body |
| `Endpoint` | `regexpUrl (RegExp), method(string)[, ...args]` | Declares an endpoint(in api) with url that matches `regexpUrl` and specified `method`('GET', 'POST', etc.). Also it's possible to pass some custom arguments via `...args`. This class has a method `body(request, response[, ...args])` that needs to be overridden and must return async object.|
| `ServingFilesEndpoint` | `regexpUrl (RegExp), mapper (function(url)), headers(additional headers to 'Content-Type' in response), notFoundEndpoint(Endpoint)` | Extends `Endpoint` and serves files on url that mathes `regexpUrl` with `mapper` function that gets location of a file on a disk by the url. Also it's required to declare `notFoundEndpoint` that handles the cases when a file is not found. You also can specify headers in response(no need to specify the 'Content-Type', library makes it for you). |
| `CachedServingFilesEndpoint` | `regexpUrl (RegExp), mapper(function(url)), headers(additional headers to 'Content-Type' in response), notFoundEndpoint(Endpoint)` | Does the same that `ServingFilesEndpoint` does and caches files on server side for increasing speed of serving them. |
| `IndexEndpoint` | no args | `Endpoint` that is used for representing index page. |
| `NotFoundEndpoint` | `regexpUrl (RegExp)` | `Endpoint` that is used in `RestApi, ServingFilesEndpoint, CachedServingFilesEndpoint` for declaring endpoint on 404(NOT_FOUND) status. |
| `CORSEndpoint` | `endpoint, { allowedOrigins, allowedMethods, allowedHeaders, allowedCredentials, maxAge }` | Enables CORS for specified endpoint and configuration ([example](#example-of-using-corsendpoint)) |
| `InternalServerErrorEndpoint` | `regexpUrl (RegExp, default is new RegExp(/^\/internal-server-error/))` | `Endpoint` that is used for handling underlying internal failure(not for user error). |

## Example

```js
'use strict'

const path = require('path')
const {
  Backend,
  RestApi,
  ServingFilesEndpoint,
  CachedServingFilesEndpoint
} = require('@cuties/rest')
const {
  CreatedOptions
} = require('@cuties/https')
const { ReadDataByPath } = require('@cuties/fs')
const SimpleResponseOnGETRequest = require('./example/SimpleResponseOnGETRequest')
const SimpleResponseOnPOSTRequest = require('./example/SimpleResponseOnPOSTRequest')
const SimpleProgressEndpoint = require('./example/SimpleProgressEndpoint')
const CustomNotFoundEndpoint = require('./example/CustomNotFoundEndpoint')
const CustomInternalServerErrorEndpoint = require('./example/CustomInternalServerErrorEndpoint')
const CustomIndexEndpoint = require('./example/CustomIndexEndpoint')

const notFoundEndpoint = new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
const internalServerErrorEndpoint = new CustomInternalServerErrorEndpoint(new RegExp(/^\/internal-server-error/))

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
    new SimpleProgressEndpoint(new RegExp(/^\/progress/), 'POST'),
    new ServingFilesEndpoint(new RegExp(/^\/files/), mapper, {}, notFoundEndpoint),
    new CachedServingFilesEndpoint(new RegExp(/^\/cached/), cacheMapper, {}, notFoundEndpoint),
    notFoundEndpoint,
    internalServerErrorEndpoint
  ), new CreatedOptions(
    'key', new ReadDataByPath('./example/pem/key.pem'),
    'cert', new ReadDataByPath('./example/pem/cert.pem')
  )
).call()

```

### CustomIndexEndpoint

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

### CustomNotFoundEndpoint

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

### SimpleResponseOnGETRequest

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

### SimpleResponseOnPOSTRequest

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
    //  Use RequestBody object for fetching body from request
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

### SimpleProgressEndpoint

```js
'use strict'

const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http')
const {
  Endpoint,
  RequestBody,
  RequestWithProgress
} = require('./../index')

class SimpleProgressEndpoint extends Endpoint {
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
        ),
        new RequestBody(
          new RequestWithProgress(request, response)
        )
      ), ' is delivered'
    )
  }
}

module.exports = SimpleProgressEndpoint

```

### CustomInternalServerErrorEndpoint

```js
'use strict'

const { InternalServerErrorEndpoint } = require('@cuties/rest')

class CustomInternalServerErrorEndpoint extends InternalServerErrorEndpoint {
  constructor (regexpUrl) {
    super(regexpUrl)
  }

  body (request, response, error) {
    return super.body(request, response, error)
  }
}

module.exports = CustomInternalServerErrorEndpoint

```
[InternalServerErrorEndpoint](https://github.com/Guseyn/cutie-rest/blob/master/src/backend/endpoint/InternalServerErrorEndpoint.js)

## Example Of Using CORSEndpoint

```js
'use strict'

const {
  Backend,
  RestApi,
  CORSEndpoint
} = require('@cuties/rest')
const SimpleResponseOnPOSTRequest = require('./example/SimpleResponseOnPOSTRequest')
const CustomNotFoundEndpoint = require('./example/CustomNotFoundEndpoint')
const CustomInternalServerErrorEndpoint = require('./example/CustomInternalServerErrorEndpoint')
const CustomIndexEndpoint = require('./example/CustomIndexEndpoint')

new Backend(
  'http', 
  8001, 
  '127.0.0.1',
  new RestApi(
    new CustomIndexEndpoint(),
    new CORSEndpoint(
      new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
      {
        allowedOrigins: [ 'https://127.0.0.1:8000' ], // or it can be just a string '*' (which is default value)
        allowedMethods: [ 'POST, OPTIONS' ], // by default it's methods in the encapsulated SimpleResponseOnPOSTRequest and OPTIONS
        allowedHeaders: [ ], // by default it's all headers of the request,
        allowedCredentials: true, // by default this value is not set,
        maxAge: 86400 // by default this value is not set
      }
    ),
    notFoundEndpoint,
    internalServerErrorEndpoint
  )
).call()

```

## Example Of Using Clustered Backend

```js
'use strict'

const domain = require('domain')
const cluster = require('cluster')
const path = require('path')
const {
  ClusteredBackendWith500ErrorEvent,
  RestApi,
  ServingFilesEndpoint,
  CachedServingFilesEndpoint,
  CORSEndpoint
} = require('@cuties/rest')
const SimpleResponseOnGETRequest = require('./example/SimpleResponseOnGETRequest')
const SimpleResponseOnPOSTRequest = require('./example/SimpleResponseOnPOSTRequest')
const SimpleResponseOnPUTRequest = require('./example/SimpleResponseOnPUTRequest')
const SimpleProgressEndpoint = require('./example/SimpleProgressEndpoint')
const CustomNotFoundEndpoint = require('./example/CustomNotFoundEndpoint')
const CustomInternalServerErrorEndpoint = require('./example/CustomInternalServerErrorEndpoint')
const CustomIndexEndpoint = require('./example/CustomIndexEndpoint')
const ErrorEndpoint = require('./example/ErrorEndpoint')

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

new ClusteredBackendWith500ErrorEvent(
  domain,
  cluster,
  (error, request, response) => {
    response.statusCode = 500
    response.setHeader('content-type', 'text/plain')
    response.end(`Internal Server Error (500):\n ${error}`)
  },
  'http',
  8000,
  '127.0.0.1',
  new RestApi(
    new CustomIndexEndpoint(),
    new SimpleResponseOnGETRequest(new RegExp(/^\/get/), 'GET'),
    new ErrorEndpoint(new RegExp(/^\/error/), 'GET'),
    new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
    new SimpleProgressEndpoint(new RegExp(/^\/progress/), 'POST'),
    new ServingFilesEndpoint(new RegExp(/^\/files/), mapper, {}, notFoundEndpoint),
    new CachedServingFilesEndpoint(new RegExp(/^\/cached/), cacheMapper, {}, notFoundEndpoint),
    notFoundEndpoint,
    internalServerErrorEndpoint
  )
).call()

```
