'use script'

const { DeepStrictEqualAssertion } = require('@cuties/assert')
const HeadersWithMaxAgeHeader = require('./../../../src/backend/endpoint/HeadersWithMaxAgeHeader')

new DeepStrictEqualAssertion(
  new HeadersWithMaxAgeHeader(
    { }, 10
  ),
  {
    'Access-Control-Max-Age': 10
  }
).call()

new DeepStrictEqualAssertion(
  new HeadersWithMaxAgeHeader(
    { }
  ),
  { }
).call()
