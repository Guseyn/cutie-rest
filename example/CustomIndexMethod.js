'use strict'

const { IndexMethod } = require('./../index')

class CustomIndexMethod extends IndexMethod {
  constructor () {
    super()
  }

  invoke (request, response) {
    super.invoke(request, response)
  }
}

module.exports = CustomIndexMethod
