'use script'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { IndexEndpoint } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

new Assertion(
  new Is(
    new IndexEndpoint().body(
      new RequestMock(), new ResponseMock()
    ), ResponseMock
  )
).call()

new Assertion(
  new IndexEndpoint().match('/', 'GET')
).call()
