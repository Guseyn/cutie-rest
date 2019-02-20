'use strict'

const { Event } = require('@cuties/cutie')

const {
  MethodOfIncomingMessage,
  UrlOfIncomingMessage
} = require('@cuties/http')
const {
  ConcatenatedBuffers
} = require('@cuties/buffer')
const MatchedEndpoint = require('./../endpoint/MatchedEndpoint')
const InvokedEndpoint = require('./../endpoint/InvokedEndpoint')
const RequestWithBody = require('./../request/RequestWithBody')

class EndEvent extends Event {
  constructor (endpoints, request, response, body) {
    super()
    this.endpoints = endpoints
    this.request = request
    this.response = response
    this.body = body
  }

  definedBody () {
    new InvokedEndpoint(
      new MatchedEndpoint(
        this.endpoints,
        new MethodOfIncomingMessage(this.request),
        new UrlOfIncomingMessage(this.request)
      ),
      new RequestWithBody(
        this.request, new ConcatenatedBuffers(this.body)
      ),
      this.response
    ).call()
  }
}

module.exports = EndEvent
