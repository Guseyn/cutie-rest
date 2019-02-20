'use strict'

const Event = require('@cuties/cutie').Event
const InternalServerErrorMethod = require('./../method/InternalServerErrorMethod')
const InvokedMethod = require('./../method/InvokedMethod')

class ErrorEvent extends Event {
  constructor (methods, request, response) {
    super()
    this.methods = methods
    this.request = request
    this.response = response
  }

  definedBody (error) {
    let internalServerErrorMethod = this.methods.find(method => {
      return method instanceof InternalServerErrorMethod
    })
    new InvokedMethod(
      internalServerErrorMethod,
      this.request,
      this.response,
      error
    ).call()
  }
}

module.exports = ErrorEvent
