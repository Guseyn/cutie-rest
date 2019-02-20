'use script'

const path = require('path')
const { Assertion } = require('@cuties/assert')
const { IsString } = require('@cuties/is')
const { CachedServingFilesEndpoint, NotFoundEndpoint } = require('./../../../index')
const RequestMock = require('./../../../mock/RequestMock')
const ResponseMock = require('./../../../mock/ResponseMock')

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

const requestMock = new RequestMock()
requestMock.url = '/cached/text.txt'
requestMock.method = 'GET'

new Assertion(
  new IsString(
    new CachedServingFilesEndpoint(
      new RegExp(/^\/cached/),
      cacheMapper,
      new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
    ).body(
      requestMock, new ResponseMock()
    ),
    ResponseMock
  )
).call()
