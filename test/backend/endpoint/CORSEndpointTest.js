'use script'

const { Assertion } = require('@cuties/assert')
const { Is, IsAsyncObject } = require('@cuties/is')
const { Endpoint, CORSEndpoint } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

class CustomEndpoint extends Endpoint {
  constructor (regexpUrl, type) {
    super(regexpUrl, type)
  }

  body (request, response, ...args) {
    return new Assertion(false)
  }
}

new Assertion(
  new Is(
    new CORSEndpoint(
      new Endpoint()
    ),
    Endpoint
  )
).call()

new Assertion(
  new IsAsyncObject(
    new CORSEndpoint(
      new CustomEndpoint(new RegExp(/^\/url/), 'GET')
    ).body(new RequestMock(), new ResponseMock())
  )
).call()

new Assertion(
  new IsAsyncObject(
    new CORSEndpoint(
      new CustomEndpoint(new RegExp(/^\/url/), 'GET'),
      {
        allowedOrigins: [ 'host' ],
        allowedMethods: [ 'ANY_METHOD' ],
        allowedHeaders: [ 'ANY_HEADER' ],
        allowedCredentials: true,
        maxAge: 10
      }
    ).body(new RequestMock(), new ResponseMock())
  )
).call()
