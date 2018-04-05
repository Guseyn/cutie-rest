'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class LoggedListeningServer extends AsyncObject {
  
  constructor(server, listeningMessage) {
    super(server, listeningMessage);
  }

  definedSyncCall() {
    return (server, listeningMessage) => {
      console.log(listeningMessage);
      return server;
    }
  }

}

module.exports = LoggedListeningServer;
