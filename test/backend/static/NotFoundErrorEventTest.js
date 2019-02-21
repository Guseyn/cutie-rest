'use strict'

const { Assertion } = require('@cuties/assert')
const { IsUndefined } = require('@cuties/is')
const { NotFoundEndpoint } = require('./../../../index')
const NotFoundErrorEvent = require('./../../../src/backend/static/NotFoundErrorEvent')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

class CustomNotFoundEndpoint extends NotFoundEndpoint {
  constructor (regexpUrl) {
    super(regexpUrl)
  }

  body (request, response) {
    return super.body(request, response)
  }
}

new Assertion(
  new IsUndefined(
    new NotFoundErrorEvent(
      new CustomNotFoundEndpoint(new RegExp(/\/not-found/)),
      new RequestMock(),
      new ResponseMock()
    ).body(new Error('error'))
  )
).call()
