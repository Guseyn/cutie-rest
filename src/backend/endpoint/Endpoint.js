'use strict'

// interface for REST API method

class Endpoint {
  constructor (regexpUrl, type) {
    this.regexpUrl = regexpUrl
    this.type = type
  }

  /*
    To be overriden (must return async object)
  */
  body (request, response, ...args) {
    throw new Error('method invoke must be overriden')
  }

  match (type, url) {
    return this.type === type && this.regexpUrl.test(url)
  }
}

module.exports = Endpoint
