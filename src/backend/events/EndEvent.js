'use strict'

const { Event } = require('@cuties/cutie')

const {
  MethodOfIncomingMessage,
  UrlOfIncomingMessage
} = require('@cuties/http')
const {
  ConcatenatedBuffers
} = require('@cuties/buffer')
const MatchedMethod = require('./../method/MatchedMethod')
const InvokedMethod = require('./../method/InvokedMethod')
const RequestWithBody = require('./../request/RequestWithBody')

class EndEvent extends Event {
  constructor (methods, request, response, body) {
    super()
    this.methods = methods
    this.request = request
    this.response = response
    this.body = body
  }

  definedBody () {
    new InvokedMethod(
      new MatchedMethod(
        this.methods,
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
