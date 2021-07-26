'use strict'

const {
  AsyncObject
} = require('@cuties/cutie')
const {
  Endpoint
} = require('./../index')

class ThrownError extends AsyncObject {
  constructor () {
    super()
  }

  syncCall () {
    throw new Error('something bad happend')
  }
}

class SimpleResponseOnGETRequest extends Endpoint {
  constructor (regexpUrl, type) {
    super(regexpUrl, type)
  }

  body (request, response) {
    return new ThrownError()
  }
}

module.exports = SimpleResponseOnGETRequest
