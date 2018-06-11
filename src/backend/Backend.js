'use strict'

const cutieHttp = require('@guseyn/cutie-http');
const ListeningServer = cutieHttp.ListeningServer;
const CreatedHttpServer = cutieHttp.CreatedHttpServer;
const CreatedDefaultHttpServer = cutieHttp.CreatedDefaultHttpServer;

const RestApi = require('./RestApi');
const LoggedListeningServer = require('./LoggedListeningServer');

class Backend {

  constructor(port, host) {
    this.port = port;
    this.host = host;
  }

  runWithApi(api) {
    new LoggedListeningServer(
      new ListeningServer(
        new CreatedHttpServer(api),
        this.port, this.host
      ), `server is listening on ${this.host}:${this.port} with pid:${process.pid}`
    ).call();
  }


}

module.exports = Backend;
