'use strict'

const Event = require('@guseyn/cutie').Event;
const UrlOfRequest = require('@guseyn/cutie-http').UrlOfRequest;
const MatchedMethod = require('./MatchedMethod');
const InvokedMethod = require('./InvokedMethod');

class RestApi extends Event {

  constructor(...methods) {
    super();
    this.methods = methods;
  }

  definedBody(request, response) {
    new InvokedMethod(
      new MatchedMethod(
        this.methods, new UrlOfRequest(request)
      ), request, response
    ).call();
  }

}

module.exports = RestApi;
