'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class LoggedConnectedServer extends AsyncObject {
  
  constructor(listeningMessage) {
    super(listeningMessage);
  }

  definedSyncCall() {
    return (listeningMessage) => {
      console.log(listeningMessage);
      return;
    }
  }

}

module.exports = LoggedConnectedServer;
