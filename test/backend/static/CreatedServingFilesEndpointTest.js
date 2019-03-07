'use script'

const path = require('path')
const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { CreatedServingFilesEndpoint, ServingFilesEndpoint, NotFoundEndpoint } = require('./../../../index')

class CustomNotFoundEndpoint extends NotFoundEndpoint {
  constructor (regexpUrl) {
    super(regexpUrl)
  }

  body (request, response) {
    return super.body(request, response)
  }
}

const mapper = (url) => {
  let parts = url.split('/').filter(part => part !== '')
  return path.join(...parts)
}

new Assertion(
  new Is(
    new CreatedServingFilesEndpoint(
      new RegExp(/^\/files/),
      mapper,
      {},
      new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
    ),
    ServingFilesEndpoint
  )
).call()
