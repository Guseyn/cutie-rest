'use strict'

const { DeepStrictEqualAssertion } = require('@cuties/assert')
const { Value } = require('@cuties/object')
const { RequestParams } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')

new DeepStrictEqualAssertion(
  new Value(
    new RequestParams(
      new RequestMock()
    ), 'query'
  ),
  'cutie rest'
).call()
