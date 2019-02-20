'use strict'

const { AsyncObject } = require('@cuties/cutie')
const CachedServingFilesMethod = require('./CachedServingFilesMethod')

class CreatedCachedServingFilesMethod extends AsyncObject {
  constructor (regexpUrl, mapper, notFoundMethod) {
    super(regexpUrl, mapper, notFoundMethod)
  }

  definedSyncCall () {
    return (regexpUrl, mapper, notFoundMethod) => {
      return new CachedServingFilesMethod(regexpUrl, mapper, notFoundMethod)
    }
  }
}

module.exports = CreatedCachedServingFilesMethod
