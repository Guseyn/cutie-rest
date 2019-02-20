'use strict'

const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http')
const {
  Endpoint,
  RequestBody
} = require('./../index')

class SimpleResponseOnPOSTRequest extends Endpoint {
  constructor (regexpUrl, type) {
    super(regexpUrl, type)
  }

  body (request, response) {
    // request also contains body(as buffer), use RequestBody object for that
    return
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok', {
            'Content-Type': 'text/plain'
          }
        ), new RequestBody(request)
      ), ' is delivered'
    )
  }
}

module.exports = SimpleResponseOnPOSTRequest
