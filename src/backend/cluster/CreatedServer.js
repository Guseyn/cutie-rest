'use strict'

const http = require('http')
const https = require('https')

const {
  AsyncObject
} = require('@cuties/cutie')
const CreatedDomainWithErrorEventAndRunFunction = require('./CreatedDomainWithErrorEventAndRunFunction')

const supportedProtocols = {
  http,
  https
}

class CreatedServer extends AsyncObject {
  constructor (protocol, domain, cluster, errorEvent, options, requestListener) {
    super(protocol, domain, cluster, errorEvent, options, requestListener)
  }

  syncCall () {
    return (protocol, domain, cluster, errorEvent, options, requestListener) => {
      if (protocol === 'http' || protocol === 'https') {
        let server
        if (typeof options === 'function') {
          requestListener = options
          server = supportedProtocols[protocol].createServer((request, response) => {
            new CreatedDomainWithErrorEventAndRunFunction(
              domain, cluster, errorEvent, server, requestListener, request, response
            ).call()
          })
        } else if (typeof options === 'object') {
          server = supportedProtocols[protocol].createServer(options, (request, response) => {
            new CreatedDomainWithErrorEventAndRunFunction(
              domain, cluster, errorEvent, server, requestListener, request, response
            ).call()
          })
        }
        return server
      } else {
        throw new Error(`Protocol ${protocol} is not supported.`)
      }
    }
  }
}

module.exports = CreatedServer
