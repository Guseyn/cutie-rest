'use strict'

const Endpoint = require('./Endpoint')

const {
  ResponseWithHeader,
  ResponseWithStatusCode,
  ResponseWithStatusMessage,
  WrittenResponse,
  EndedResponse
} = require('@cuties/http')

class IndexEndpoint extends Endpoint {
  constructor () {
    super(new RegExp(/^(\/|)$/), 'GET')
  }

  body (request, response) {
    return new EndedResponse(
      new WrittenResponse(
        new ResponseWithHeader(
          new ResponseWithStatusMessage(
            new ResponseWithStatusCode(response, 200), 'Ok'
          ),
          'Content-Type', 'text/plain'
        ),
        'Index.'
      )
    )
  }
}

module.exports = IndexEndpoint
