'use strict'

const {
  Endpoint
} = require('./../index')
const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http')

class SimpleResponseOnGETRequest extends Endpoint {
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
        ), 'content'
      ), ' is delivered'
    )
  }
}

module.exports = SimpleResponseOnGETRequest
