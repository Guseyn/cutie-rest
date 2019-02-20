'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject
const NotFoundEndpoint = require('./NotFoundEndpoint')

class MatchedEndpoint extends AsyncObject {
  constructor (endpoints, url, type) {
    super(endpoints, url, type)
  }

  definedSyncCall () {
    return (endpoints, url, type) => {
      let matchedEndpoint = endpoints.find(endpoint => {
        return endpoint.match(url, type)
      })
      if (!matchedEndpoint) {
        // 404
        let notFoundEndpoint = endpoints.find(endpoint => {
          return endpoint instanceof NotFoundEndpoint
        })
        if (!notFoundEndpoint) {
          throw new Error(`there is no endpoint for url ${url} and method ${type}`)
        }
        matchedEndpoint = notFoundEndpoint
      }
      return matchedEndpoint
    }
  }
}

module.exports = MatchedEndpoint
