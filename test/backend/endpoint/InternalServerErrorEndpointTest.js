'use script'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { InternalServerErrorEndpoint } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

new Assertion(
  new Is(
    new InternalServerErrorEndpoint(
      new RegExp(/^\/internal-server-error/)
    ).body(
      new RequestMock(), new ResponseMock()
    ), ResponseMock
  )
).call()
