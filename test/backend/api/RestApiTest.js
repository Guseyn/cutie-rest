'use strict'

const { Assertion } = require('@cuties/assert')
const { Is, IsUndefined } = require('@cuties/is')
const { RestApi } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

new Assertion(
  new Is(
    new RestApi(), Function
  )
).call()

new Assertion(
  new IsUndefined(
    new RestApi().syncCall()()(
      new RequestMock(), new ResponseMock()
    )
  )
).call()
