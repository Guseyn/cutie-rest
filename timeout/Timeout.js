'use strict'

const { AsyncObject } = require('@cuties/cutie')
const timeout = require('./custom-calls/timeout')

// Represented result is ms
class Timeout extends AsyncObject {
  constructor (ms) {
    super(ms)
  }

  asyncCall () {
    return timeout
  }

  callbackWithError() {
    return false
  }
}

module.exports = Timeout
