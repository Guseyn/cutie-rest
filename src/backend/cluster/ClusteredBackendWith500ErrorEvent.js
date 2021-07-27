'use strict'

const { If } = require('@cuties/if-else')
const {
  IsMaster,
  ClusterWithForkedWorkers,
  ClusterWithExitEvent
} = require('@cuties/cluster')
const {
  AsyncObject
} = require('@cuties/cutie')
const {
  ListeningServer
} = require('@cuties/http')

const EmptyRestApi = require('./../api/EmptyRestApi')
const LoggedListeningServer = require('./../server/LoggedListeningServer')

const KilledProcessOnPortIfExists = require('./KilledProcessOnPortIfExists')
const ReloadedBackendOnFailedWorkerEvent = require('./ReloadedBackendOnFailedWorkerEvent')
const CreatedServer = require('./CreatedServer')

const numberOfCPUCores = require('os').cpus().length

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
class ClusteredBackendWith500ErrorEvent extends AsyncObject {
  constructor (domain, cluster, errorEvent, protocol, port, host, api, options, numberOfForks = numberOfCPUCores) {
    super(domain, cluster, errorEvent, protocol, port, host, api, options, numberOfForks)
  }

  asyncCall () {
    return (domain, cluster, errorEvent, protocol, port, host, api, options, numberOfForks, callback) => {
      new If(
        new IsMaster(cluster),
        new KilledProcessOnPortIfExists(port).after(
          new ClusterWithForkedWorkers(
            new ClusterWithExitEvent(
              cluster,
              new ReloadedBackendOnFailedWorkerEvent(cluster)
            ), numberOfForks
          )
        ),
        new CallbackForServer(
          callback, new LoggedListeningServer(
            new ListeningServer(
              this.server(domain, cluster, errorEvent, protocol, api, options), port, host
            ), `${protocol} server is listening on ${host}:${port} with pid:${process.pid}`
          )
        )
      ).call()
    }
  }

  server (domain, cluster, errorEvent, protocol, api, options) {
    let server
    if (options) {
      server = new CreatedServer(protocol, domain, cluster, errorEvent, options, api || new EmptyRestApi())
    } else {
      server = new CreatedServer(protocol, domain, cluster, errorEvent, api || new EmptyRestApi())
    }
    return server
  }

  callbackWithError () {
    return false
  }
}

module.exports = ClusteredBackendWith500ErrorEvent
