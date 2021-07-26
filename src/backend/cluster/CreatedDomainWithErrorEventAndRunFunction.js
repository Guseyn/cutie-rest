'use strict'

const {
  AsyncObject
} = require('@cuties/cutie')

const timeToExitProcess = 30000

class CreatedDomainWithErrorEventAndRunFunction extends AsyncObject {
  constructor (domain, cluster, errorEvent, server, requestListener, request, response) {
    super(domain, cluster, errorEvent, server, requestListener, request, response)
  }

  syncCall () {
    return (domain, cluster, errorEvent, server, requestListener, request, response) => {
      const d = domain.create()
      d.on('error', (err) => {
        try {
          errorEvent(err, request, response)
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

module.exports = CreatedDomainWithErrorEventAndRunFunction
