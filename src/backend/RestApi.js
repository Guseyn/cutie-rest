'use strict'

const Event = require('@guseyn/cutie').Event;

const {
  RequestWithDataEvent,
  RequestWithEndEvent,
  RequestWithErrorEvent
} = require('@guseyn/cutie-http');

const DataEvent = require('./events/DataEvent');
const EndEvent = require('./events/EndEvent');
const ErrorEvent = require('./events/ErrorEvent'); 

const Logger = require('./../Logger'); 

class RestApi extends Event {

  constructor(...methods) {
    super();
    this.methods = methods;
  }

  definedBody(request, response) {
    let body = [];
    new RequestWithEndEvent(
      new RequestWithErrorEvent(
        new RequestWithDataEvent(
          request, new DataEvent(body)
        ), new ErrorEvent()
      ), new EndEvent(
        this.methods, request, response, body
      )
    ).call();
  }

}

module.exports = RestApi;
