'use strict'

const { AsyncObject } = require('@cuties/cutie')
const fetchBodyOfRequest = require('./custom-calls/fetchBodyOfRequest')

class RequestBody extends AsyncObject {
  constructor (request) {
    super(request)
  }

  asyncCall () {
    return (request, callback) => {
      request.body ? callback(null, request.body) : fetchBodyOfRequest(request, callback)
    }
  }
}

module.exports = RequestBody
