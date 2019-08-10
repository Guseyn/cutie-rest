'use strict'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { RequestBody } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')
const RequestWithNoBodyMock = require('./../../../mock/RequestWithNoBodyMock')

new Assertion(
  new Is(
    new RequestBody(
      new RequestMock()
    ), Buffer
  )
).call()

new Assertion(
  new Is(
    new RequestBody(
      new RequestWithNoBodyMock()
    ), Buffer
  )
).call()
