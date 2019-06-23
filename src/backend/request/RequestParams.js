'use strict'

const url = require('url');
const AsyncObject = require('@cuties/cutie').AsyncObject

class RequestParams extends AsyncObject {
  constructor (request) {
    super(request)
  }

  syncCall () {
    return (request) => {
      return url.parse(request.url, true).query
    }
  }
}

module.exports = RequestParams
