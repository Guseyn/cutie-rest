'use strict'

const Event = require('@guseyn/cutie').Event;
const cutieHttp = require('@guseyn/cutie-http');

const { 
  HeadersOfIncomingMessage,
  MethodOfIncomingMessage,
  UrlOfIncomingMessage
} = cutieHttp;
const MatchedMethod = require('./MatchedMethod');
const InvokedMethod = require('./InvokedMethod');

class EndEvent extends Event {

  constructor(methods, request, response, body) {
    super();
    this.methods = methods;
    this.request = request;
    this.response = response;
    this.body = body;
  }

  definedBody() {

    this.body = Buffer.concat(this.body);
    
    let headers = new HeadersOfIncomingMessage(this.request);
    let methodType = new MethodOfIncomingMessage(this.request);
    let url = new UrlOfIncomingMessage(this.request);
    
    new InvokedMethod(
      new MatchedMethod(this.methods, methodType, url),
        headers, methodType, url, this.body, this.response
    ).call();
  
  }

}

module.exports = EndEvent;
