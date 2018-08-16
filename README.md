# cutie-rest

[![NPM Version][npm-image]][npm-url]

Cutie extension for using REST (based on [cutie-http](https://github.com/Guseyn/cutie-http)) in Node. It's based on the [Async Tree Pattern](https://github.com/Guseyn/async-tree-patern/blob/master/Async_Tree_Patern.pdf).

# Usage

```js
const {
  // Needed async objects here from the table below
} = require('@guseyn/cutie-rest');
```

This library provides following objects: `Backend`, `RestApi`, `ServingFiles`, `CachedServingFiles` and `Method`, `NotFoundMethod` interfaces.

| Object | Parameters | Description |
| ------ | -----------| ----------- |
| `Backend` | `port` (number), `host` (string), `api` (`RestApi`)| Declares backend server(just http for now) on specified `port` and `host`, also it provides declared `api` (REST).|
| `RestApi` | ...methods(classes that extend `Method`) | Declares methods of api. |
| `Method` | `regexp` (`RegExp`), method (string) | Declares a method(in api) with url that matches `regexp` and specified `method`('GET', 'POST', etc.). This class has a method `invoke(request, response)` that needs to be overridden.|
| `ServingFiles` | `regexp` (`RegExp`), mapper (`function(url)`), `notFoundMethod` (`Method`) | Extends `Method` and serves files on url that mathes `regexp` with `mapper` function that gets location of a file on a disk by the url. Also it's required to declare `notFoundMethod` that handles the cases when a file is not found. |
| `CachedServingFiles` | `regexp` (`RegExp`), `mapper` (`function(url)`), `notFoundMethod` (`Method`) | Does the same that `ServingFiles` does and caches files for increasing speed of serving them. |
| `NotFoundMethod` | `regexp` (`RegExp`) | Method is used in `RestApi`, `ServingFiles`, `CachedServingFiles` for declaring method on 404(NOT_FOUND) status. |

# Example

```js
'use strict'

const path = require('path');
const {
  Backend,
  RestApi,
  CachedServingFiles
} = require('@guseyn/cutie-rest');
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
## CustomNotFoundMethod

```js
'use strict'

const { NotFoundMethod } = require('./NotFoundMethod');

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

## GeneratedResponse

This class also uses [cutie-http](https://github.com/Guseyn/cutie-http)

```js
'use strict'

const { Method } = require('@guseyn/cutie-rest');

const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@guseyn/cutie-http');

class GeneratedResponse extends Method {

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
        ), 'content ... '
      ), `is delivered`
    ).call();
  }

}

module.exports = GeneratedResponse;
```


[npm-image]: https://img.shields.io/npm/v/@guseyn/cutie-rest.svg
[npm-url]: https://npmjs.org/package/@guseyn/cutie-rest
