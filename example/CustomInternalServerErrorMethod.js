'use strict'

const { InternalServerErrorMethod } = require('./../index')

class CustomInternalServerErrorMethod extends InternalServerErrorMethod {
  constructor () {
    super()
  }

  invoke (request, response, error) {
    super.invoke(request, response, error)
  }
}

module.exports = CustomInternalServerErrorMethod
