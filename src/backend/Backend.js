'use strict'

const {
  AsyncObject, Event
} = require('@cuties/cutie');
const {
  ListeningServer,
  CreatedHttpServer,
  CreatedDefaultHttpServer
} = require('@cuties/http');
const RestApi = require('./api/RestApi');
const EmptyRestApi = require('./api/EmptyRestApi');
const LoggedListeningServer = require('./server/LoggedListeningServer');

// Represented result is server(with attached api)
class Backend extends AsyncObject {

  constructor(port, host, api) {
    super(port, host, api);
  }

  definedSyncCall() {
    return (port, host, api) => {
      let server = new LoggedListeningServer(
        new ListeningServer(
          new CreatedHttpServer(api || new EmptyRestApi()), port, host
        ), `server is listening on ${host}:${port} with pid:${process.pid}`
      );
      server.call();
      return server;
    }
  }

}

module.exports = Backend;
