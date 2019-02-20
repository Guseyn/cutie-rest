'use strict'

const Endpoint = require('./Endpoint')

const {
  ResponseWithHeader,
  ResponseWithStatusCode,
  ResponseWithStatusMessage,
  WrittenResponse,
  EndedResponse
} = require('@cuties/http')

class InternalServerErrorEndpoint extends Endpoint {
  constructor () {
    super()
  }

  body (request, response, error) {
    return
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithHeader(
          new ResponseWithStatusMessage(
            new ResponseWithStatusCode(response, 500), 'Internal Server Error'
          ),
          'Content-Type', 'text/plain'
        ),
        `500: Internal Server Error, \n${error}`
      )
    )
  }
}

module.exports = InternalServerErrorEndpoint
