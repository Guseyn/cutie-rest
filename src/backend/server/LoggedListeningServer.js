'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject

class LoggedListeningServer extends AsyncObject {
  constructor (server, listeningMessage) {
    super(server, listeningMessage)
  }

  syncCall () {
    return (server, listeningMessage) => {
      console.log(listeningMessage)
      return server
    }
  }
}

module.exports = LoggedListeningServer
