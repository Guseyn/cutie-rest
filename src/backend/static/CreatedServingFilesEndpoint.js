'use strict'

const { AsyncObject } = require('@cuties/cutie')
const ServingFilesEndpoint = require('./ServingFilesEndpoint')

class CreatedServingFilesEndpoint extends AsyncObject {
  constructor (regexpUrl, mapper, headers, notFoundEndpoint) {
    super(regexpUrl, mapper, headers, notFoundEndpoint)
  }

  syncCall () {
    return (regexpUrl, mapper, headers, notFoundEndpoint) => {
      return new ServingFilesEndpoint(regexpUrl, mapper, headers, notFoundEndpoint)
    }
  }
}

module.exports = CreatedServingFilesEndpoint
