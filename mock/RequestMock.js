'use strict'

class RequestMock {
  constructor () {
    this.body = Buffer.alloc(10)
  }
  on () {}
}

module.exports = RequestMock
