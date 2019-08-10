'use strict'

const { AsyncObject } = require('@cuties/cutie')
const fetchBodyOfRequest = require('./custom-calls/fetchBodyOfRequest')

class FetchedBodyOfRequest extends AsyncObject {
  constructor (request) {
    super(request)
  }

  asyncCall () {
    return (request, callback) => {
      fetchBodyOfRequest(request, callback)
    }
  }
}

module.exports = FetchedBodyOfRequest
