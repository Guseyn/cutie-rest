'use strict'

const { AsyncObject } = require('@cuties/cutie')

class HeadersWithAllowCredentialsHeader extends AsyncObject {
  constructor (headers, allowedCredentials) {
    super(headers, allowedCredentials)
  }

  syncCall () {
    return (headers, allowedCredentials) => {
      if (allowedCredentials) {
        headers['Access-Control-Allow-Credentials'] = true
      }
      return headers
    }
  }
}

module.exports = HeadersWithAllowCredentialsHeader
