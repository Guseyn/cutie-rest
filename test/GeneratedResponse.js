'use strict'

const Method = require('./../src/backend/method/Method');

const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http');

class GeneratedResponse extends Method {

  constructor(regexpUrl, type) {
    super(regexpUrl, type);
  }

  invoke(request, response) {
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok',  {
            'Content-Type': 'text/plain' 
          }
        ), 'content ... '
      ), `is delivered`
    ).call();
  }

}

module.exports = GeneratedResponse;
