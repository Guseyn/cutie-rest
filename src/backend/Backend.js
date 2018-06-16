'use strict'

const Event = require('@guseyn/cutie').Event;
const {
  ListeningServer,
  CreatedHttpServer,
  CreatedDefaultHttpServer
} = require('@guseyn/cutie-http');
const RestApi = require('./api/RestApi');
const EmptyRestApi = require('./api/EmptyRestApi');
const LoggedListeningServer = require('./server/LoggedListeningServer');

class Backend {

  constructor(port, host, api) {
    this.server = new LoggedListeningServer(
      new ListeningServer(
        new CreatedHttpServer(api || new EmptyRestApi()), port, host
      ), `server is listening on ${host}:${port} with pid:${process.pid}`
    );
  }

  run() {
    this.server.call();
  }

}

module.exports = Backend;
