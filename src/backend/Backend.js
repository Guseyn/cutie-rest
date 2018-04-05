'use strict'

const cutieHttp = require('@guseyn/cutie-http');
const ListeningServer = cutieHttp.ListeningServer;
const CreatedHttpServer = cutieHttp.CreatedHttpServer;
const CreatedDefaultHttpServer = cutieHttp.CreatedDefaultHttpServer;

const RestApi = require('./RestApi');
const LoggedListeningServer = require('./LoggedListeningServer');

class Backend {

  constructor(port, host, options) {
    this.port = port;
    this.host = host;
    this.options = options;
  }

  runWithApi(api) {
    
    let createdHttpServer = this.options
      ? new CreatedHttpServer(this.options, api)
      : new CreatedDefaultHttpServer(api);
    
    new LoggedListeningServer(
      new ListeningServer(
        createdHttpServer, this.port, this.host
      ), `server is listening on ${this.host}:${this.port} with pid:${process.pid}`
    ).call();

  }

}

module.exports = Backend;
