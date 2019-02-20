'use strict'

const Method = require('./../method/Method')

const {
  ResponseWithHeader,
  ResponseWithStatusCode,
  ResponseWithStatusMessage,
  WrittenResponse,
  EndedResponse
} = require('@cuties/http')

class NotFoundMethod extends Method {
  constructor (regexpUrl) {
    super(regexpUrl, 'GET')
  }

  invoke (request, response) {
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithHeader(
          new ResponseWithStatusMessage(
            new ResponseWithStatusCode(response, 404), 'Not found'
          ),
          'Content-Type', 'text/plain'
        ),
        '404: Not found'
      )
    ).call()
  }
}

module.exports = NotFoundMethod
