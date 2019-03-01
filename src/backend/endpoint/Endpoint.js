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

  match (url, type) {
    let match = false
    if (this.type) {
      match = this.type === type && this.regexpUrl.test(url)
    } else {
      match = this.regexpUrl.test(url)
    }
    return match
  }
}

module.exports = Endpoint
