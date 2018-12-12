'use strict'

const Method = require('./Method');

const {
  ResponseWithHeader,
  ResponseWithStatusCode,
  ResponseWithStatusMessage,
  WrittenResponse,
  EndedResponse
} = require('@cuties/http');

class IndexMethod extends Method {

  constructor() {
    super(new RegExp(/^(\/|)$/), 'GET');
  }

  invoke(request, response) {
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithHeader(
          new ResponseWithStatusMessage(
            new ResponseWithStatusCode(response, 200), 'Ok'
          ),
          'Content-Type', 'text/plain'
        ), 
        'Index.'
      )
    ).call();
  }

}

module.exports = IndexMethod;
