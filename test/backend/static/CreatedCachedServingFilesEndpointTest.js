'use script'

const path = require('path')
const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const { CreatedCachedServingFilesEndpoint, CachedServingFilesEndpoint, NotFoundEndpoint } = require('./../../../index')

class CustomNotFoundEndpoint extends NotFoundEndpoint {
  constructor (regexpUrl) {
    super(regexpUrl)
  }

  body (request, response) {
    return super.body(request, response)
  }
}

const cacheMapper = (url) => {
  let parts = url.split('/').filter(part => part !== '').slice(1)
  parts.unshift('files')
  return path.join(...parts)
}

new Assertion(
  new Is(
    new CreatedCachedServingFilesEndpoint(
      new RegExp(/^\/cached/),
      cacheMapper,
      {},
      new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
    ),
    CachedServingFilesEndpoint
  )
).call()
