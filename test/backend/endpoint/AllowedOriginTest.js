'use script'

const { StrictEqualAssertion } = require('@cuties/assert')
const AllowedOrigin = require('./../../../src/backend/endpoint/AllowedOrigin')

new StrictEqualAssertion(
  new AllowedOrigin(
    '*', {
      headers: {
        host: 'host',
        origin: 'origin'
      }
    }
  ),
  '*'
).call()

new StrictEqualAssertion(
  new AllowedOrigin(
    [ 'origin' ], {
      headers: {
        host: 'host',
        origin: 'origin'
      }
    }
  ),
  'origin'
).call()

new StrictEqualAssertion(
  new AllowedOrigin(
    [ ], {
      headers: {
        host: 'host',
        origin: 'origin'
      }
    }
  ),
  'host'
).call()

new StrictEqualAssertion(
  new AllowedOrigin(
    [ ], {
      headers: {
        host: 'host'
      }
    }
  ),
  'host'
).call()
