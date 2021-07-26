'use strict'

const {
  FoundProcessOnPort,
  KilledProcess,
  Pid
} = require('@cuties/process')

class KilledProcessOnPortIfExists {
  constructor (port) {
    return new KilledProcess(
      new Pid(
        new FoundProcessOnPort(
          port
        )
      )
    )
  }
}

module.exports = KilledProcessOnPortIfExists
