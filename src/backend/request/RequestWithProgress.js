'use strict'

const { AsyncObject } = require('@cuties/cutie')
const progressRequest = require('./custom-calls/progressRequest')

class RequestWithProgress extends AsyncObject {
  constructor (request, response, totalLengthHeaderName) {
    super(request, response, totalLengthHeaderName || 'content-length')
  }

  asyncCall () {
    return (request, response, totalLengthHeaderName, callback) => {
      progressRequest(request, response, totalLengthHeaderName, callback)
    }
  }
}

module.exports = RequestWithProgress
