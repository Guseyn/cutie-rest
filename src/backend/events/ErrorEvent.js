'use strict'

const Event = require('@cuties/cutie').Event
const InternalServerErroEndpoint = require('./../endpoint/InternalServerErrorEndpoint')
const InvokedEndpoint = require('./../endpoint/InvokedEndpoint')

class ErrorEvent extends Event {
  constructor (endpoints, request, response) {
    super()
    this.endpoints = endpoints
    this.request = request
    this.response = response
  }

  definedBody (error) {
    let internalServerErrorEndpoint = this.endpoints.find(endpoint => {
      return endpoint instanceof InternalServerErrorEndpoint
    })
    new InvokedEndpoint(
      internalServerErrorEndpoint,
      this.request,
      this.response,
      error
    ).call()
  }
}

module.exports = ErrorEvent
