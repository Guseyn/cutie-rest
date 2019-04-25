'use strict'

class RequestMock {
  constructor () {
    this.body = Buffer.alloc(10)
  }
  on (eventName, callback) {
    if (eventName === 'data') {
      callback(Buffer.alloc(1))
    } else if (eventName === 'end') {
      callback()
    }
  }
}

module.exports = RequestMock
