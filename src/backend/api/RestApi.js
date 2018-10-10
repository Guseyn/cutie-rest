'use strict'

const { AsyncObject } = require('@cuties/cutie');
const { RequestWithDataEvent, RequestWithEndEvent, RequestWithErrorEvent } = require('@cuties/http');
const DataEvent = require('./../events/DataEvent');
const EndEvent = require('./../events/EndEvent');
const ErrorEvent = require('./../events/ErrorEvent'); 

// Represents request-response listener
class RestApi extends AsyncObject {

  constructor(...methods) {
    super(...methods);
  }

  definedSyncCall() {
    return (...methods) => {
      return (request, response) => {
        let body = [];
        new RequestWithEndEvent(
          new RequestWithErrorEvent(
            new RequestWithDataEvent(
              request, new DataEvent(body)
            ), new ErrorEvent()
          ), new EndEvent(methods, request, response, body)
        ).call();
      }
    }
  }

}

module.exports = RestApi;
