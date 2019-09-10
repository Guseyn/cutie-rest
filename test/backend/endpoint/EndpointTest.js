'use script'

const { Assertion, DeepStrictEqualAssertion } = require('@cuties/assert')
const { IsBoolean, Is } = require('@cuties/is')
const { Endpoint } = require('./../../../index')

try {
  new Endpoint().body()
} catch (error) {
  new DeepStrictEqualAssertion(
    error, new Error('method body must be overriden')
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

new Assertion(
  new Is(
    new Endpoint(new RegExp(/^\/url/), 'GET').withAdditionalMethod('ANY_METHOD'),
    Endpoint
  )
).call()

new Assertion(
  new Is(
    new Endpoint(new RegExp(/^\/url/), 'GET').withBody(() => {}),
    Endpoint
  )
).call()

new Assertion(
  new Endpoint(new RegExp(/^\/url/), 'GET').is({ method: 'POST' }, 'POST')
).call()

new DeepStrictEqualAssertion(
  new Endpoint(new RegExp(/^\/url/), ' GET , POST ').methods(),
  ['GET', 'POST']
).call()
