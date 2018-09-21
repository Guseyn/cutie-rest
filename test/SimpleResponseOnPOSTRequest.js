'use strict'

const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@cuties/http');
const {
  Method,
  RequestBody
} = require('./../index');

class SimpleResponseOnPOSTRequest extends Method {

  constructor(regexpUrl, type) {
    super(regexpUrl, type);
  }

  invoke(request, response) {
    // request also contains body(as buffer), use RequestBody object for that
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok',  {
            'Content-Type': 'text/plain' 
          }
        ), new RequestBody(request)
      ), ' is delivered'
    ).call();
  }

}

module.exports = SimpleResponseOnPOSTRequest;
