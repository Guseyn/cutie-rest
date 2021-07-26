'use strict'

const {
  AsyncObject
} = require('@cuties/cutie')
const {
  ListeningServer,
  CreatedHttpServer
} = require('@cuties/http')
const {
  CreatedHttpsServer
} = require('@cuties/https')
const EmptyRestApi = require('./api/EmptyRestApi')
const LoggedListeningServer = require('./server/LoggedListeningServer')

class CallbackForServer extends AsyncObject {
  constructor (callback, server) {
    super(callback, server)
  }

  syncCall () {
    return (callback, server) => {
      callback(server)
      return callback
    }
  }
}

// Represented result is server(with attached api)
class Backend extends AsyncObject {
  constructor (protocol, port, host, api, options) {
    super(protocol, port, host, api, options)
  }

  asyncCall () {
    return (protocol, port, host, api, options, callback) => {
      new CallbackForServer(
        callback, new LoggedListeningServer(
          new ListeningServer(
            this.server(protocol, api, options), port, host
          ), `${protocol} server is listening on ${host}:${port} with pid:${process.pid}`
        )
      ).call()
    }
  }

  server (protocol, api, options) {
    let server
    if (protocol === 'http') {
      if (options) {
        server = new CreatedHttpServer(options, api || new EmptyRestApi())
      } else {
        server = new CreatedHttpServer(api || new EmptyRestApi())
      }
    } else if (protocol === 'https') {
      if (options) {
        server = new CreatedHttpsServer(options, api || new EmptyRestApi())
      } else {
        server = new CreatedHttpsServer(api || new EmptyRestApi())
      }
    } else {
      throw new Error(`Protocol ${protocol} is not supported.`)
    }
    return server
  }

  callbackWithError () {
    return false
  }
}

module.exports = Backend
