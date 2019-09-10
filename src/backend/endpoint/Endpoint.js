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
    throw new Error('method body must be overriden')
  }

  match (url, type) {
    let match = false
    if (this.type) {
      if (type) {
        type = type.trim()
      }
      match = this.type.split(',').filter(t => t.trim() === type).length > 0 && this.regexpUrl.test(url)
    } else {
      match = this.regexpUrl.test(url)
    }
    return match
  }

  withAdditionalMethod (method) {
    this.type += `, ${method}`
    return this
  }

  withBody (body) {
    this.body = body
    return this
  }

  is (request, type) {
    return request.method === type
  }

  methods () {
    return this.type.split(',').map(m => m.trim())
  }
}

module.exports = Endpoint
