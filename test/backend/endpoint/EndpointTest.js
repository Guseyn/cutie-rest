'use script'

const { Assertion, DeepStrictEqualAssertion } = require('@cuties/assert')
const { IsBoolean } = require('@cuties/is')
const { Endpoint } = require('./../../../index')

try {
  new Endpoint().body()
} catch (error) {
  new DeepStrictEqualAssertion(
    error, new Error('method invoke must be overriden')
  ).call()
}

new Assertion(
  new IsBoolean(
    new Endpoint(new RegExp(/^\/url/), 'GET').match('/url', 'GET')
  )
).call()

new Assertion(
  new Endpoint(new RegExp(/^\/url/)).match('/url', 'ANY_METHOD')
).call()
