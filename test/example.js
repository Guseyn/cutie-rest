'use strict'

const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@guseyn/cutie-http');
const AsyncObject = require('@guseyn/cutie').AsyncObject;

const Backend = require('./../src/backend/Backend');
const RestApi = require('./../src/backend/RestApi');
const Method = require('./../src/backend/Method');

class GeneratedResponse extends Method {

  constructor(regexpUrl, type) {
    super(regexpUrl, type);
  }

  invoke(headers, type, url, body, response) {
    new EndedResponse(
      new WrittenResponse(
        new ResponseWithWrittenHead(
          response, 200, 'ok',  {
            'Content-Type': 'text/plain' 
          }
        ), 'content ... '
      ), `is delivered => ${body}`
    ).call();
  }

}

new Backend(4200, '127.0.0.1').runWithApi(
  new RestApi(
    new GeneratedResponse(new RegExp(/\//), 'GET')
  )
);