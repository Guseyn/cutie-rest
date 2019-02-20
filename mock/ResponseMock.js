'use strict'

class ResponseMock {
  constructor () {}
  write (chunk, encoding, callback) {
    callback(null)
  }
  end (data, encoding, callback) {
    callback(null)
  }
  on () {}
  setHeader () {}
}

module.exports = ResponseMock
