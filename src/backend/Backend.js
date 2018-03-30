'use strict'

const cutie = require('@guseyn/cutie');
const Event = cutie.Event;
const AsyncObject = cutie.AsyncObject;
const cutieHttp = require('@guseyn/cutie-http');
const ListeningServer = cutieHttp.ListeningServer;
const CreatedHttpServer = cutieHttp.CreatedHttpServer;
const CreatedDefaultHttpServer = cutieHttp.CreatedDefaultHttpServer;

const RestApi = require('./RestApi');


class ServerListeningEvent extends Event {

  constructor() {
    super();
  }

  definedBody() {
    return new LoggedConnectedServer().call();
  }

}
class LoggedConnectedServer extends AsyncObject {
  
  constructor() {
    super();
  }

  definedSyncCall() {
    return () => {
      console.log('listening...');
      return;
    }
  }

}

class Backend {

  constructor(port, host, options) {
    this.port = port;
    this.host = host;
    this.options = options;
  }

  runWithApi(api) {
    let createdHttpServer = this.options
      ? new CreatedHttpServer(
        this.options, api
      )
      : new CreatedDefaultHttpServer(api)
    new ListeningServer(
      createdHttpServer, this.port, this.host,
      new ServerListeningEvent()
    ).call();
  }

}


new Backend(8080, '127.0.0.1').runWithApi(new RestApi());

module.exports = Backend;
