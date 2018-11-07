'use strict'

const {
  AsyncObject, Event
} = require('@cuties/cutie');
const {
  ListeningServer,
  CreatedHttpServer
} = require('@cuties/http');
const {
  CreatedHttpsServer
} = require('@cuties/https');
const RestApi = require('./api/RestApi');
const EmptyRestApi = require('./api/EmptyRestApi');
const LoggedListeningServer = require('./server/LoggedListeningServer');

// Represented result is server(with attached api)
class Backend extends AsyncObject {

  constructor(protocol, port, host, api, options) {
    super(protocol, port, host, api, options);
  }

  definedSyncCall() {
    return (protocol, port, host, api, options) => {
      let serverCore;
      if (protocol === 'http') {
        if (options) {
          serverCore = new CreatedHttpServer(options, api || new EmptyRestApi());
        } else {
          serverCore = new CreatedHttpServer(api || new EmptyRestApi());
        }
      } else if (protocol === 'https') {
        if (options) {
          serverCore = new CreatedHttpsServer(options, api || new EmptyRestApi());
        } else {
          serverCore = new CreatedHttpsServer(api || new EmptyRestApi());
        }
      } else {
        throw new Error(`Protocol ${protocol} is not allowed.`);
      }
      let server = new LoggedListeningServer(
        new ListeningServer(
          serverCore, port, host
        ), `server is listening on ${host}:${port} with pid:${process.pid}`
      );
      server.call();
      return server;
    }
  }

}

module.exports = Backend;
