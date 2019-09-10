'use strict'

const { AsyncObject } = require('@cuties/cutie')

class AllowedOrigin extends AsyncObject {
  constructor (allowedOrigins, request) {
    super(allowedOrigins, request)
  }

  syncCall () {
    return (allowedOrigins, request) => {
      if (allowedOrigins === '*') {
        return '*'
      }
      const origin = request.headers.origin
      if (origin) {
        if (allowedOrigins.indexOf(origin) !== -1) {
          return origin
        }
      }
      return request.headers.host
    }
  }
}

module.exports = AllowedOrigin
