'use strict'

const { Assertion } = require('@cuties/assert')
const { IsUndefined } = require('@cuties/is')
const { IndexEndpoint, InternalServerErrorEndpoint } = require('./../../../index')
const ErrorEvent = require('./../../../src/backend/event/ErrorEvent')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

class CustomInternalServerErrorEndpoint extends InternalServerErrorEndpoint {
  constructor () {
    super()
  }

  body (request, response, error) {
    return super.body(request, response, error)
  }
}

new Assertion(
  new IsUndefined(
    new ErrorEvent(
      [ new IndexEndpoint(), new CustomInternalServerErrorEndpoint() ],
      new RequestMock(),
      new ResponseMock()
    ).body(new Error('error'))
  )
).call()

new Assertion(
  new IsUndefined(
    new ErrorEvent(
      [ new IndexEndpoint() ],
      new RequestMock(),
      new ResponseMock()
    ).body(new Error('error'))
  )
).call()
