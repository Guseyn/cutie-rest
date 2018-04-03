'use strict'

const Event = require('@guseyn/cutie').Event;
const LoggedConnectedServer = require('./../async/LoggedConnectedServer');

class ServerListeningEvent extends Event {

  constructor(listeningMessage) {
    super();
    this.listeningMessage = listeningMessage;
  }

  definedBody() {
    new LoggedConnectedServer(this.listeningMessage).call();
  }

}

module.exports = ServerListeningEvent;
