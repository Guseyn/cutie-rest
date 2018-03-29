'use strict'

const cutieHttp = require('@guseyn/cutie-http');
const ListeningServer = cutieHttp.ListeningServer;
const CreatedHttpServer = cutieHttp.CreatedHttpServer;

class Backend {

  constructor(port, host, options) {
    this.port = port;
    this.host = host;
    this.options = options;
  }

  runWithApi(api) {
    new ListeningServer(
      new CreatedHttpServer(
        this.options, api
      ), this.port, this.host
    )
  }

}
