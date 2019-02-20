'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject
const NotFoundEndpoint = require('./NotFoundEndpoint')

class MatchedEndpoint extends AsyncObject {
  constructor (endpoints, type, url) {
    super(endpoints, type, url)
  }

  definedSyncCall () {
    return (endpoints, type, url) => {
      let matchedEndpoint = endpoints.find(endpoint => {
        return endpoint.match(type, url)
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
