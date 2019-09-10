'use script'

const { DeepStrictEqualAssertion } = require('@cuties/assert')
const HeadersWithAllowCredentialsHeader = require('./../../../src/backend/endpoint/HeadersWithAllowCredentialsHeader')

new DeepStrictEqualAssertion(
  new HeadersWithAllowCredentialsHeader(
    { }, true
  ),
  {
    'Access-Control-Allow-Credentials': true
  }
).call()

new DeepStrictEqualAssertion(
  new HeadersWithAllowCredentialsHeader(
    { }
  ),
  { }
).call()
