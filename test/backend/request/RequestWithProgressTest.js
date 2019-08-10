'use strict'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { RequestWithProgress, RequestBody } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

new Assertion(
  new Is(
    new RequestBody(
      new RequestWithProgress(
        new RequestMock(),
        new ResponseMock()
      )
    ), Buffer
  )
).call()

new Assertion(
  new Is(
    new RequestBody(
      new RequestWithProgress(
        new RequestMock(),
        new ResponseMock(),
        'content-length'
      )
    ), Buffer
  )
).call()
