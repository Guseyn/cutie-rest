'use script'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { Endpoint, IndexEndpoint } = require('./../../../index')
const InvokedEndpoint = require('./../../../src/backend/endpoint/InvokedEndpoint')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

new Assertion(
  new Is(
    new InvokedEndpoint(
      new IndexEndpoint(),
      new RequestMock(),
      new ResponseMock()
    ),
    Endpoint
  )
).call()
