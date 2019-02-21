'use strict'

const Event = require('@cuties/cutie').Event

class DataEvent extends Event {
  constructor (body) {
    super()
    this.bodyArray = body
  }

  body (data) {
    this.bodyArray.push(data)
  }
}

module.exports = DataEvent
