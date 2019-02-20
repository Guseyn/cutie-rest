'use strict'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { RequestBody } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')

new Assertion(
  new Is(
    new RequestBody(
      new RequestMock()
    ), Buffer
  )
).call()
