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
    //  Use RequestBody object for fetching body from request
    return new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok', {
            'Content-Type': 'application/json'
          }
        ), new RequestBody(request)
      )
    )
  }
}

module.exports = SimpleResponseOnPOSTRequest
