'use strict'

const Method = require('./../method/Method');

const {
  ResponseWithWrittenHead,
  WrittenResponse,
  EndedResponse
} = require('@guseyn/cutie-http');

class NotFoundMethod extends Method {

  constructor(regexpUrl) {
    super(regexpUrl, 'GET');
  }

  invoke(request, response) {
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(response, 404, 'Not found'), 
        '404: Not found'
      )
    ).call();
  }

}

module.exports = NotFoundMethod;
