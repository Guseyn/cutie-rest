'use strict'

const { AsyncObject } = require('@cuties/cutie')
const ServingFilesEndpoint = require('./ServingFilesEndpoint')

class CreatedServingFilesEndpoint extends AsyncObject {
  constructor (regexpUrl, mapper, notFoundEndpoint) {
    super(regexpUrl, mapper, notFoundEndpoint)
  }

  syncCall () {
    return (regexpUrl, mapper, notFoundEndpoint) => {
      return new ServingFilesEndpoint(regexpUrl, mapper, notFoundEndpoint)
    }
  }
}

module.exports = CreatedServingFilesEndpoint
