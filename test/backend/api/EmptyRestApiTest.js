'use strict'

const { Assertion } = require('@cuties/assert')
const { Is, IsUndefined } = require('@cuties/is')
const EmptyRestApi = require('./../../../src/backend/api/EmptyRestApi')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

new Assertion(
  new Is(
    new EmptyRestApi(), Function
  )
).call()

new Assertion(
  new IsUndefined(
    new EmptyRestApi().definedBody(
      new RequestMock(), new ResponseMock()
    )
  )
).call()
