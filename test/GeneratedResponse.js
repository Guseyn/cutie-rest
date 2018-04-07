'use strict'

const Method = require('./../src/backend/method/Method');

const {
  EndedResponse,
  WrittenResponse,
  ResponseWithWrittenHead
} = require('@guseyn/cutie-http');
const LoggedMemoryUsage = require('./LoggedMemoryUsage');

class GeneratedResponse extends Method {

  constructor(regexpUrl, type) {
    super(regexpUrl, type);
  }

  invoke(headers, type, url, body, response) {
    let content = {headers, type, url, body};
    new LoggedMemoryUsage(
      new EndedResponse(
        new WrittenResponse(
          new ResponseWithWrittenHead(
            response, 200, 'ok',  {
              'Content-Type': 'text/plain' 
            }
          ), 'content ... '
        ), `is delivered => ${content}`
      )
    ).call();
  }

}

module.exports = GeneratedResponse;
