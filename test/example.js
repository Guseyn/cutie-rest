'use strict'

const cutieHttp = require('@guseyn/cutie-http');
const AsyncObject = require('@guseyn/cutie').AsyncObject;

const Backend = require('./../src/backend/Backend');
const RestApi = require('./../src/backend/RestApi');
const Method = require('./../src/backend/Method');

const EndedResponse = cutieHttp.EndedResponse;
const WrittenResponse = cutieHttp.WrittenResponse;

class GeneratedResponse extends Method {

  constructor(regexpUrl, type) {
    super(regexpUrl, type);
  }

  invoke(headers, type, url, body, response) {
    console.log({
      headers,
      type,
      url,
      body
    });
    new EndedResponse(
      new WrittenResponse(
        response, 'content ... '
      ), `is delivered => ${body}`
    ).call();
  }

}

new Backend(4200, '127.0.0.1').runWithApi(
  new RestApi(
    new GeneratedResponse(new RegExp(/a/), 'POST')
  )
);