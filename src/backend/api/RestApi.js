'use strict'

const { AsyncObject } = require('@cuties/cutie')
const { ReadableWithDataEvent, ReadableWithEndEvent, ReadableWithErrorEvent } = require('@cuties/stream')
const DataEvent = require('./../event/DataEvent')
const EndEvent = require('./../event/EndEvent')
const ErrorEvent = require('./../event/ErrorEvent')

// Represents request-response listener
class RestApi extends AsyncObject {
  constructor (...endpoints) {
    super(...endpoints)
  }

  definedSyncCall () {
    return (...endpoints) => {
      return (request, response) => {
        let body = []
        new ReadableWithEndEvent(
          new ReadableWithDataEvent(
            new ReadableWithErrorEvent(
              request, new ErrorEvent(endpoints, request, response)
            ), new DataEvent(body)
          ), new EndEvent(endpoints, request, response, body)
        ).call()
      }
    }
  }
}

module.exports = RestApi
