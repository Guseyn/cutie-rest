'use strict'

const { AsyncObject } = require('@cuties/cutie')
const CachedServingFilesEndpoint = require('./CachedServingFilesEndpoint')

class CreatedCachedServingFilesEndpoint extends AsyncObject {
  constructor (regexpUrl, mapper, notFounEndpoint) {
    super(regexpUrl, mapper, notFounEndpoint)
  }

  definedSyncCall () {
    return (regexpUrl, mapper, notFounEndpoint) => {
      return new CachedServingFilesEndpoint(regexpUrl, mapper, notFounEndpoint)
    }
  }
}

module.exports = CreatedCachedServingFilesEndpoint
