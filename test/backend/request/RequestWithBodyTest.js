'use strict'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const RequestWithBody = require('./../../../src/backend/request/RequestWithBody')
const RequestMock = require('./../../../mock/RequestMock')

new Assertion(
  new Is(
    new RequestWithBody(
      new RequestMock(),
      Buffer.alloc(10)
    ), RequestMock
  )
).call()
