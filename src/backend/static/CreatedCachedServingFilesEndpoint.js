'use strict'

const { AsyncObject } = require('@cuties/cutie')
const CachedServingFilesEndpoint = require('./CachedServingFilesEndpoint')

class CreatedCachedServingFilesEndpoint extends AsyncObject {
  constructor (regexpUrl, mapper, headers, notFounEndpoint) {
    super(regexpUrl, mapper, headers, notFounEndpoint)
  }

  syncCall () {
    return (regexpUrl, mapper, headers, notFounEndpoint) => {
      return new CachedServingFilesEndpoint(regexpUrl, mapper, headers, notFounEndpoint)
    }
  }
}

module.exports = CreatedCachedServingFilesEndpoint
