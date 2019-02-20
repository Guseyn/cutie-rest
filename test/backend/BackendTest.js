'use strict'

const HttpServer = require('http').Server
const HttpsServer = require('https').Server
const { AsyncObject, as } = require('@cuties/cutie')
const { Assertion, DeepStrictEqualAssertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { Backend, RestApi } = require('./../../index')
const { CreatedOptions, ClosedServer } = require('@cuties/https')

const timeoutCall = (ms, callback) => {
  setTimeout(() => {
    callback(ms)
  }, ms)
}

// Represented result is ms
class Timeout extends AsyncObject {
  constructor (ms) {
    super(ms)
  }

  definedAsyncCall () {
    return timeoutCall
  }

  callbackWithError () {
    return false
  }
}

class SafeBackend extends Backend {
  onError (error) {
    new DeepStrictEqualAssertion(
      error, new Error('Protocol bad is not allowed.')
    ).call()
  }
}

new Assertion(
  new Is(
    new Backend(
      'https',
      8000,
      '127.0.0.1',
      new RestApi(), new CreatedOptions()
    ).as('backend'),
    HttpsServer
  )
).after(
  new Timeout(100).after(
    new ClosedServer(as('backend'))
  )
).call()

new Assertion(
  new Is(
    new Backend(
      'https',
      8001,
      '127.0.0.1',
      new RestApi()
    ).as('backend'),
    HttpsServer
  )
).after(
  new Timeout(100).after(
    new ClosedServer(as('backend'))
  )
).call()

new Assertion(
  new Is(
    new Backend(
      'https',
      8002,
      '127.0.0.1'
    ).as('backend'),
    HttpsServer
  )
).after(
  new Timeout(100).after(
    new ClosedServer(as('backend'))
  )
).call()

new Assertion(
  new Is(
    new Backend(
      'http',
      8003,
      '127.0.0.1',
      new RestApi(), new CreatedOptions()
    ).as('backend'),
    HttpServer
  )
).after(
  new Timeout(100).after(
    new ClosedServer(as('backend'))
  )
).call()

new Assertion(
  new Is(
    new Backend(
      'http',
      8004,
      '127.0.0.1',
      new RestApi()
    ).as('backend'),
    HttpServer
  )
).after(
  new Timeout(100).after(
    new ClosedServer(as('backend'))
  )
).call()

new Assertion(
  new Is(
    new Backend(
      'http',
      8005,
      '127.0.0.1'
    ).as('backend'),
    HttpServer
  )
).after(
  new Timeout(100).after(
    new ClosedServer(as('backend'))
  )
).call()

new Assertion(
  new Is(
    new SafeBackend(
      'bad',
      8006,
      '127.0.0.1',
      new RestApi(), new CreatedOptions()
    ).as('backend'),
    HttpServer
  )
).after(
  new Timeout(100).after(
    new ClosedServer(as('backend'))
  )
).call()
