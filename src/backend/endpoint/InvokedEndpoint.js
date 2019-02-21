'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

class InvokedEndpoint extends AsyncObject {
  constructor (endpoint, request, response, ...args) {
    super(endpoint, request, response, ...args)
  }

  syncCall () {
    return (endpoint, request, response, ...args) => {
      endpoint.body(request, response, ...args).call()
      return endpoint
    }
  }
}

module.exports = InvokedEndpoint
