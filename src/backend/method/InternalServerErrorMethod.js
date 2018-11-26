'use strict'

const Method = require('./../method/Method');

const {
  ResponseWithHeader,
  ResponseWithStatusCode,
  ResponseWithStatusMessage,
  WrittenResponse,
  EndedResponse
} = require('@cuties/http');

class InternalServerErrorMethod extends Method {

  constructor() {
    super();
  }

  invoke(request, response, error) {
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
    ).call();
  }

}

module.exports = InternalServerErrorMethod;
