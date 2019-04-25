'use strict'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const FetchedBodyOfRequest = require('./../../../src/backend/request/FetchedBodyOfRequest')
const RequestMock = require('./../../../mock/RequestMock')

new Assertion(
  new Is(
    new FetchedBodyOfRequest(
      new RequestMock()
    ), Buffer
  )
).call()
