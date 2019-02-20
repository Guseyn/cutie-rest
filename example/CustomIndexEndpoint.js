'use strict'

const { IndexEndpoint } = require('./../index')

class CustomIndexEndpoint extends IndexEndpoint {
  constructor () {
    super()
  }

  body (request, response) {
    return super.body(request, response)
  }
}

module.exports = CustomIndexEndpoint
