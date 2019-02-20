'use script'

const path = require('path')
const { Assertion } = require('@cuties/assert')
const { IsString } = require('@cuties/is')
const { ServingFilesEndpoint, NotFoundEndpoint } = require('./../../../index')
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

const mapper = (url) => {
  let parts = url.split('/').filter(part => part !== '')
  return path.join(...parts)
}

const requestMock = new RequestMock()
requestMock.url = '/files/text.txt'
requestMock.method = 'GET'

new Assertion(
  new IsString(
    new ServingFilesEndpoint(
      new RegExp(/^\/files/),
      mapper,
      new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
    ).body(
      requestMock, new ResponseMock()
    ),
    ResponseMock
  )
).call()
