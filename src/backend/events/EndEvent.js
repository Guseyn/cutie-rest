'use strict'

const Event = require('@guseyn/cutie').Event;

const { 
  HeadersOfIncomingMessage,
  MethodOfIncomingMessage,
  UrlOfIncomingMessage
} = require('@guseyn/cutie-http');
const MatchedMethod = require('./../method/MatchedMethod');
const InvokedMethod = require('./../method/InvokedMethod');

class EndEvent extends Event {

  constructor(methods, request, response, body) {
    super();
    this.methods = methods;
    this.request = request;
    this.response = response;
    this.body = body;
  }

  definedBody() {
    new InvokedMethod(
      new MatchedMethod(this.methods, methodType, url),
        new HeadersOfIncomingMessage(this.request),
        new MethodOfIncomingMessage(this.request),
        new UrlOfIncomingMessage(this.request),
        Buffer.concat(this.body), this.response
    ).call();
  }

}

module.exports = EndEvent;
