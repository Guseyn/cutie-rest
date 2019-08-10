'use strict'

class RequestWithNoBodyMock {
  constructor () {
    this.url = '/search?query=cutie+rest'
    this.headers = {
      'content-length': '1'
    }
  }
  on (eventName, callback) {
    if (eventName === 'data') {
      callback(Buffer.alloc(1))
    } else if (eventName === 'end') {
      callback()
    }
  }
  write () {}
}

module.exports = RequestWithNoBodyMock
