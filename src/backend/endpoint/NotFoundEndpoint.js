'use strict'

const Endpoint = require('./../endpoint/Endpoint')

const {
  ResponseWithHeader,
  ResponseWithStatusCode,
  ResponseWithStatusMessage,
  WrittenResponse,
  EndedResponse
} = require('@cuties/http')

class NotFoundEndpoint extends Endpoint {
  constructor (regexpUrl) {
    super(regexpUrl, 'GET')
  }

  body (request, response) {
    return new EndedResponse(
      new WrittenResponse(
        new ResponseWithHeader(
          new ResponseWithStatusMessage(
            new ResponseWithStatusCode(response, 404), 'Not found'
          ),
          'Content-Type', 'text/plain'
        ),
        '404: Not found'
      )
    )
  }
}

module.exports = NotFoundEndpoint
