'use strict'

const { AsyncObject } = require('@cuties/cutie')
const { ReadableWithErrorEvent } = require('@cuties/stream')
const { MethodOfIncomingMessage, UrlOfIncomingMessage } = require('@cuties/http')
const MatchedEndpoint = require('./../endpoint/MatchedEndpoint')
const InvokedEndpoint = require('./../endpoint/InvokedEndpoint')
const RequestWithBody = require('./../request/RequestWithBody')
const FetchedBodyOfRequest = require('./../request/FetchedBodyOfRequest')
const ErrorEvent = require('./../event/ErrorEvent')

// Represents request-response listener
class RestApi extends AsyncObject {
  constructor (...endpoints) {
    super(...endpoints)
  }

  syncCall () {
    return (...endpoints) => {
      return (request, response) => {
        new InvokedEndpoint(
          new MatchedEndpoint(
            endpoints,
            new UrlOfIncomingMessage(request),
            new MethodOfIncomingMessage(request)
          ),
          new RequestWithBody(
            new ReadableWithErrorEvent(
              request, new ErrorEvent(endpoints, request, response)
            ), new FetchedBodyOfRequest(request)
          ),
          response
        ).call()
      }
    }
  }
}

module.exports = RestApi
