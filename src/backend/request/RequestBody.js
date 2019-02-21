'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

class RequestBody extends AsyncObject {
  constructor (request) {
    super(request)
  }

  syncCall () {
    return (request) => {
      return request.body
    }
  }
}

module.exports = RequestBody
