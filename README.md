# cutie-rest

[![NPM Version][npm-image]][npm-url]

[Cutie](https://github.com/Guseyn/cutie) extension for using REST (based on [cutie-http](https://github.com/Guseyn/cutie-http)) in Node. It's based on the [Async Tree Pattern](https://github.com/Guseyn/async-tree-patern/blob/master/Async_Tree_Patern.pdf).

# Usage

```js
const {
  // Needed async objects here from the table below
} = require('@cuties/rest');
```

This library provides following objects: `Backend, RestApi, RequestBody, CreatedServingFilesMethod, CreatedCachedServingFilesMethod, ServingFiles, CachedServingFiles` and `Method, NotFoundMethod, Index, InternalServerErrorMethod` interfaces.

| Object | Parameters(type) | Description |
| ------ | -----------| ----------- |
| `Backend` | `protocol, port(number), host(string), api(RestApi)[, options]`| It's `AsyncObject`. It Declares backend server with `protocol`(`http` or `https`) on specified `port` and `host`, also it provides declared `api` (REST). `options` is for options of the http/https server(it's optional).|
| `RestApi` | `...methods`(classes that extend `Method`) | Represents request-response listener. Declares methods of api. |
| `RequestBody` | `request` | Reads body of `request` in `invoke(request, response)` method of `Method` implementation |
| `Method` | `regexp(RegExp), method(string)[, ...args]` | Declares a method(in api) with url that matches `regexp` and specified `method`('GET', 'POST', etc.). Also it's possible to pass some custom arguments via `...args`. This class has a method `invoke(request, response[, ...args])` that needs to be overridden.|
| `CreatedServingFilesMethod` | `regexp (RegExp or AsyncObject that represents RegExp), mapper (function(url) or AsyncObject that represents mapper function), notFoundMethod(Method or AsyncObject that represents Method)` | `AsyncObject` that represents `ServingFilesMethod` |
| `CreatedCachedServingFilesMethod` | `regexp (RegExp or AsyncObject that represents RegExp), mapper (function(url) or AsyncObject that represents mapper function), notFoundMethod(Method or AsyncObject that represents Method)` | `AsyncObject` that represents `CachedServingFilesMethod` |
| `ServingFilesMethod` | `regexp (RegExp), mapper (function(url)`), `notFoundMethod(Method)` | Extends `Method` and serves files on url that mathes `regexp` with `mapper` function that gets location of a file on a disk by the url. Also it's required to declare `notFoundMethod` that handles the cases when a file is not found. |
| `CachedServingFilesMethod` | `regexp(RegExp), mapper(function(url)), notFoundMethod(Method)` | Does the same that `ServingFiles` does and caches files for increasing speed of serving them. |
| `IndexMethod` | no args | `Method` that is used for representing index page. |
| `NotFoundMethod` | `regexp(RegExp)` | `Method` that is used in `RestApi, ServingFilesMethod, CachedServingFilesMethod` for declaring method on 404(NOT_FOUND) status. |
| `InternalServerErrorMethod` | no args | `Method` that is used for handling underlying internal failure(not for user error). |

# Example

```js
'use strict'

const path = require('path');
const {
  Backend,
  RestApi,
  CreatedServingFilesMethod,
  CreatedCachedServingFilesMethod
} = require('@cuties/rest');
const {
  CreatedOptions
} = require('@cuties/https');
const { ReadDataByPath } = require('@cuties/fs');
const SimpleResponseOnGETRequest = require('./SimpleResponseOnGETRequest');
const SimpleResponseOnPOSTRequest = require('./SimpleResponseOnPOSTRequest');
const CustomNotFoundMethod = require('./CustomNotFoundMethod');
const CustomIndexMethod = require('./CustomIndexMethod');
const CustomInternalServerErrorMethod = require('./CustomInternalServerErrorMethod');

const notFoundMethod = new CustomNotFoundMethod(new RegExp(/^\/not-found/));
const internalServerErrorMethod = new CustomInternalServerErrorMethod();

const mapper = (url) => {
  let parts = url.split('/').filter(part => part !== '');
  return path.join(...parts);
}

const cacheMapper = (url) => {
  let parts = url.split('/').filter(part => part !== '').slice(1);
  parts.unshift('files');
  return path.join(...parts);
}

new Backend(
  'https', 
  8000, 
  '127.0.0.1',
  new RestApi(
    new CustomIndexMethod(),
    new SimpleResponseOnGETRequest(new RegExp(/^\/get/), 'GET'),
    new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
    new CreatedServingFilesMethod(new RegExp(/^\/files/), mapper, notFoundMethod),
    new CreatedCachedServingFilesMethod(new RegExp(/^\/cached/), cacheMapper, notFoundMethod),
    notFoundMethod,
    internalServerErrorMethod
  ), new CreatedOptions(
    'key', new ReadDataByPath('./test/pem/key.pem'),
    'cert', new ReadDataByPath('./test/pem/cert.pem')
  )
).call();

```

## CustomIndexMethod

```js
'use strict'

const { IndexMethod } = require('./../index');

class CustomIndex extends IndexMethod {

  constructor() {
    super();
  }

  invoke(request, response) {
    super.invoke(request, response);
  }

}

module.exports = CustomIndex;

```

[IndexMethod](https://github.com/Guseyn/cutie-rest/blob/master/src/backend/method/Index.js)

## CustomNotFoundMethod

```js
'use strict'

const {
  NotFoundMethod
} = require('@cuties/rest');

class CustomNotFoundMethod extends NotFoundMethod {

  constructor(regexpUrl) {
    super(regexpUrl);
  }
  
  invoke(request, response) {
    super.invoke(request, response);
  }

}

module.exports = CustomNotFoundMethod;
```
[NotFoundMethod](https://github.com/Guseyn/cutie-rest/blob/master/src/backend/method/NotFoundMethod.js)

## SimpleResponseOnGETRequest

```js
'use strict'

const { Method } = require('@cuties/rest');
const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http');

class SimpleResponseOnGETRequest extends Method {

  constructor(regexpUrl, type) {
    super(regexpUrl, type);
  }

  invoke(request, response) {
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok',  {
            'Content-Type': 'text/plain' 
          }
        ), 'constent'
      ), ' is delivered'
    ).call();
  }

}

module.exports = SimpleResponseOnGETRequest;

```

## SimpleResponseOnPOSTRequest

```js
'use strict'

const { Method, RequestBody } = require('@cuties/rest');
const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http');

class SimpleResponseOnPOSTRequest extends Method {

  constructor(regexpUrl, type) {
    super(regexpUrl, type);
  }

  invoke(request, response) {
    // request also contains body(as buffer), use RequestBody object for that
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok',  {
            'Content-Type': 'text/plain' 
          }
        ), new RequestBody(request)
      ), ' is delivered'
    ).call();
  }

}

module.exports = SimpleResponseOnPOSTRequest;

```

## CustomInternalServerErrorMethod

```js
'use strict'

const {
  InternalServerErrorMethod
} = require('@cuties/rest');

class CustomInternalServerErrorMethod extends InternalServerErrorMethod {

  constructor() {
    super();
  }
  
  invoke(request, response, error) {
    super.invoke(request, response, error);
  }

}

module.exports = CustomInternalServerErrorMethod;

```
[InternalServerErrorMethod](https://github.com/Guseyn/cutie-rest/blob/master/src/backend/method/InternalServerErrorMethod.js)

[npm-image]: https://img.shields.io/npm/v/@cuties/rest.svg
[npm-url]: https://npmjs.org/package/@cuties/rest
