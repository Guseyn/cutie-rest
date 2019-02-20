'use strict'

const { Assertion } = require('@cuties/assert')
const { IsUndefined } = require('@cuties/is')
const { IndexEndpoint } = require('./../../../index')
const EndEvent = require('./../../../src/backend/event/EndEvent')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

const requestMock = new RequestMock()
requestMock.url = ''
requestMock.method = 'GET'

new Assertion(
  new IsUndefined(
    new EndEvent(
      [ new IndexEndpoint() ],
      requestMock,
      new ResponseMock(),
      []
    ).definedBody()
  )
).call()
