'use strict'

const { AsyncObject } = require('@cuties/cutie')

class HeadersWithMaxAgeHeader extends AsyncObject {
  constructor (headers, maxAge) {
    super(headers, maxAge)
  }

  syncCall () {
    return (headers, maxAge) => {
      if (maxAge) {
        headers['Access-Control-Max-Age'] = maxAge
      }
      return headers
    }
  }
}

module.exports = HeadersWithMaxAgeHeader
