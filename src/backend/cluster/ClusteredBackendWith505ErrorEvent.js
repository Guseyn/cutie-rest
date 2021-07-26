'use strict'

const http = require('http')
const https = require('https')
const { as, Event } = require('@cuties/cutie')
const { If } = require('@cuties/if-else')
const {
  IsMaster,
  ClusterWithForkedWorkers,
  ClusterWithExitEvent,
  ForkedWorker
} = require('@cuties/cluster')
const {
  AsyncObject
} = require('@cuties/cutie')
const {
  ListeningServer
} = require('@cuties/http')
const {
  FoundProcessOnPort,
  KilledProcess,
  Pid
} = require('@cuties/process')
const EmptyRestApi = require('./../api/EmptyRestApi')
const LoggedListeningServer = require('./../server/LoggedListeningServer')

const numberOfCPUCores = require('os').cpus().length
const timeToExitProcess = 30000

class KilledProcessOnPortIfExists {
  constructor (port) {
    return new KilledProcess(
      new Pid(
        new FoundProcessOnPort(
          port
        )
      )
    )
  }
}

class ReloadedBackendOnFailedWorkerEvent extends Event {
  constructor (cluster) {
    super()
    this.cluster = cluster
  }

  body (worker, code, signal) {
    console.log(`worker ${worker.process.pid} died (${signal || code}). restarting...`)
    new ForkedWorker(this.cluster).call()
  }
}

class CreatedHttpServer extends AsyncObject {
  constructor (domain, cluster, options, requestListener) {
    super(domain, cluster, options, requestListener)
  }

  syncCall () {
    return (domain, cluster, options, requestListener) => {
      let server
      if (typeof options === 'function') {
        requestListener = options
        server = http.createServer((request, response) => {
          new CreatedDomainWithErrorEventAndRunFunction(
            domain, cluster, server, requestListener, request, response
          ).call()
        })
      } else if (typeof options === 'object') {
        server = http.createServer(options, (request, response) => {
          new CreatedDomainWithErrorEventAndRunFunction(
            domain, cluster, server, requestListener, request, response
          ).call()
        })
      }
      return server
    }
  }
}

class CreatedHttpsServer extends AsyncObject {
  constructor (domain, cluster, options, requestListener) {
    super(options, requestListener)
  }

  syncCall () {
    return (domain, cluster, options, requestListener) => {
      let server
      if (typeof options === 'function') {
        requestListener = options
        server = https.createServer((request, response) => {
          new CreatedDomainWithErrorEventAndRunFunction(
            domain, cluster, server, requestListener
          ).call()
        })
      } else if (typeof options === 'object') {
        server = https.createServer(options, (request, response) => {
          new CreatedDomainWithErrorEventAndRunFunction(
            domain, cluster, server, requestListener
          ).call()
        })
      }
      return server
    }
  }
}

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

class CreatedDomainWithErrorEventAndRunFunction extends AsyncObject {
  constructor (domain, cluster, server, requestListener, request, response) {
    super(domain, cluster, server, requestListener, request, response)
  }

  syncCall () {
    return (domain, cluster, server, requestListener, request, response) => {
      const d = domain.create()
      d.on('error', (err) => {
        try {
          response.statusCode = 500
          response.setHeader('content-type', 'text/plain')
          response.end('Internal Server Error')
          const killtimer = setTimeout(() => {
            process.exit(1)
          }, timeToExitProcess)
          killtimer.unref()
          server.close()
          cluster.worker.disconnect()
        } catch (err2) {
          throw err2
        }
      })
      d.add(request)
      d.add(response)
      d.run(() => {
        requestListener(request, response)
      })
    }
  }
}

// Represented result is server(with attached api)
class ClusteredBackendWith505ErrorEvent extends AsyncObject {
  constructor (domain, cluster, protocol, port, host, api, options, numberOfForks = numberOfCPUCores) {
    super(domain, cluster, protocol, port, host, api, options, numberOfForks)
  }

  asyncCall () {
    return (domain, cluster, protocol, port, host, api, options, numberOfForks, callback) => {
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
              this.server(domain, cluster, protocol, api, options), port, host
            ), `${protocol} server is listening on ${host}:${port} with pid:${process.pid}`
          )
        )
      ).call()
    }
  }

  server (domain, cluster, protocol, api, options) {
    let server
    if (protocol === 'http') {
      if (options) {
        server = new CreatedHttpServer(domain, cluster, options, api || new EmptyRestApi())
      } else {
        server = new CreatedHttpServer(domain, cluster, api || new EmptyRestApi())
      }
    } else if (protocol === 'https') {
      if (options) {
        server = new CreatedHttpsServer(domain, cluster, options, api || new EmptyRestApi())
      } else {
        server = new CreatedHttpsServer(domain, cluster, api || new EmptyRestApi())
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

module.exports = ClusteredBackendWith505ErrorEvent
