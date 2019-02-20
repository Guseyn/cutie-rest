'use script'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { NotFoundEndpoint } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

new Assertion(
  new Is(
    new NotFoundEndpoint(new RegExp(/\/not-found/)).body(
      new RequestMock(), new ResponseMock()
    ), ResponseMock
  )
).call()

new Assertion(
  new NotFoundEndpoint(new RegExp(/\/not-found/)).match('/not-found', 'GET')
).call()
