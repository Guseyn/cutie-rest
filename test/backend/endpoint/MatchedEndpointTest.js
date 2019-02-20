'use script'

const { Assertion, DeepStrictEqualAssertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { Endpoint, IndexEndpoint, NotFoundEndpoint } = require('./../../../index')
const MatchedEndpoint = require('./../../../src/backend/endpoint/MatchedEndpoint')

class CustomNotFoundEndpoint extends NotFoundEndpoint {
  constructor (regexpUrl) {
    super(regexpUrl)
  }

  body (request, response) {
    return super.body(request, response)
  }
}

new Assertion(
  new Is(
    new MatchedEndpoint(
      [ new IndexEndpoint() ],
      '/',
      'GET'
    ),
    Endpoint
  )
).call()

new Assertion(
  new Is(
    new MatchedEndpoint(
      [ new IndexEndpoint(), new CustomNotFoundEndpoint(new RegExp(/\/not-found/)) ],
      '/asd',
      'GET'
    ),
    NotFoundEndpoint
  )
).call()

try {
  new MatchedEndpoint(
    [ new IndexEndpoint() ],
    '/asd',
    'GET'
  ).call()
} catch (error) {
  new DeepStrictEqualAssertion(
    error, new Error(`there is no endpoint for url /asd and method GET`)
  ).call()
}
