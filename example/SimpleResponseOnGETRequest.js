'use strict'

const {
  Method
} = require('./../index')
const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http')

class SimpleResponseOnGETRequest extends Method {
  constructor (regexpUrl, type) {
    super(regexpUrl, type)
  }

  invoke (request, response) {
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok', {
            'Content-Type': 'text/plain'
          }
        ), 'constent'
      ), ' is delivered'
    ).call()
  }
}

module.exports = SimpleResponseOnGETRequest
