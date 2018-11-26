'use strict'

const { AsyncObject } = require('@cuties/cutie');
const { ReadableWithDataEvent, ReadableWithEndEvent, ReadableWithErrorEvent } = require('@cuties/stream');
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
        new ReadableWithEndEvent(
          new ReadableWithDataEvent(
            new ReadableWithErrorEvent(
              request, new ErrorEvent(methods, request, response)
            ), new DataEvent(body)
          ), new EndEvent(methods, request, response, body)
        ).call();
      }
    }
  }

}

module.exports = RestApi;
