'use strict'

const Event = require('@guseyn/cutie').Event;

const {
  RequestWithDataEvent,
  RequestWithEndEvent,
  RequestWithErrorEvent
} = require('@guseyn/cutie-http');

const DataEvent = require('./DataEvent');
const EndEvent = require('./EndEvent');
const ErrorEvent = require('./ErrorEvent'); 

const Logger = require('./../Logger'); 

class RestApi extends Event {

  constructor(...methods) {
    super();
    this.methods = methods;
  }

  definedBody(request, response) {
    let body = [];
    //new Logger(
      new RequestWithEndEvent(
        new RequestWithErrorEvent(
          new RequestWithDataEvent(
            request, new DataEvent(body)
          ), new ErrorEvent()
        ), new EndEvent(this.methods, request, response, body)
      ).call();
    //).call();
  }

}

module.exports = RestApi;
