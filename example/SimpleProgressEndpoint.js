'use strict'

const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http')
const {
  Endpoint,
  RequestBody,
  RequestWithProgress
} = require('./../index')

class SimpleProgressEndpoint extends Endpoint {
  constructor (regexpUrl, type) {
    super(regexpUrl, type)
  }

  body (request, response) {
    return new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok', {
            'Content-Type': 'text/plain'
          }
        ),
        new RequestBody(
          new RequestWithProgress(request, response)
        )
      ), ' is delivered'
    )
  }
}

module.exports = SimpleProgressEndpoint
