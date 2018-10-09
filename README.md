# cutie-rest

[![NPM Version][npm-image]][npm-url]

[Cutie](https://github.com/Guseyn/cutie) extension for using REST (based on [cutie-http](https://github.com/Guseyn/cutie-http)) in Node. It's based on the [Async Tree Pattern](https://github.com/Guseyn/async-tree-patern/blob/master/Async_Tree_Patern.pdf).

# Usage

```js
const {
  // Needed async objects here from the table below
} = require('@cuties/rest');
```

This library provides following objects: `Backend, RestApi, RequestBody, ServingFiles, CachedServingFiles` and `Method, NotFoundMethod` interfaces.

| Object | Parameters(type) | Description |
| ------ | -----------| ----------- |
| `Backend` | `port(number), host(string), api(RestApi)`| It's `AsyncObject`. It Declares backend server(just http for now) on specified `port` and `host`, also it provides declared `api` (REST).|
| `RestApi` | `...methods`(classes that extend `Method`) | It's `Event`. Declares methods of api. |
| `RequestBody` | `request` | Reads body of `request` in `invoke(request, response)` method of `Method` implementation |
| `Method` | `regexp(RegExp), method(string)` | Declares a method(in api) with url that matches `regexp` and specified `method`('GET', 'POST', etc.). This class has a method `invoke(request, response)` that needs to be overridden.|
| `ServingFiles` | `regexp (RegExp), mapper (function(url)`), `notFoundMethod(Method)` | Extends `Method` and serves files on url that mathes `regexp` with `mapper` function that gets location of a file on a disk by the url. Also it's required to declare `notFoundMethod` that handles the cases when a file is not found. |
| `CachedServingFiles` | `regexp(RegExp), mapper(function(url)), notFoundMethod(Method)` | Does the same that `ServingFiles` does and caches files for increasing speed of serving them. |
| `Index` | no args | `Method` is used for representing index page. |
| `NotFoundMethod` | `regexp(RegExp)` | `Method` is used in `RestApi, ServingFiles, CachedServingFiles` for declaring method on 404(NOT_FOUND) status. |

# Example

```js
'use strict'

const path = require('path');
const {
  Backend,
  RestApi,
  ServingFiles,
  CachedServingFiles,
  CustomIndex
} = require('@cuties/rest');
const SimpleResponseOnGETRequest = require('./SimpleResponseOnGETRequest');
const SimpleResponseOnPOSTRequest = require('./SimpleResponseOnPOSTRequest');
const CustomNotFoundMethod = require('./CustomNotFoundMethod');

const notFoundMethod = new CustomNotFoundMethod(new RegExp(/\/not-found/));

const mapper = (url) => {
  let paths = url.split('/').filter(path => path !== '');
  return path.join(...paths);
}

new Backend(
  8000, '127.0.0.1', new RestApi(
    new CustomIndex(),
    new SimpleResponseOnGETRequest(new RegExp(/^\/get/), 'GET'),
    new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
    new CachedServingFiles(new RegExp(/^\/files/), mapper, notFoundMethod),
    notFoundMethod
  )
).call();

```

## CustomIndex

```js
'use strict'

const { Index } = require('./../index');;

class CustomIndex extends Index {

  constructor() {
    super();
  }

  invoke(request, response) {
    super.invoke(request, response);
  }

}

module.exports = CustomIndex;

```

[Index](https://github.com/Guseyn/cutie-rest/blob/master/src/backend/method/Index.js)

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


[npm-image]: https://img.shields.io/npm/v/@cuties/rest.svg
[npm-url]: https://npmjs.org/package/@cuties/rest
