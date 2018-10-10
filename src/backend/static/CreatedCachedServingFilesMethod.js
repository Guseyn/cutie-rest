'use strict'

const { AsyncObject } = require('@cuties/cutie');
const CachedServingFiles = require('./CachedServingFiles');

class CreatedCachedServingFilesMethod extends AsyncObject {

  constructor(regexpUrl, mapper, notFoundMethod) {
    super(regexpUrl, mapper, notFoundMethod);
  }

  definedSyncCall() {
    return (regexpUrl, mapper, notFoundMethod) => {
      return new CachedServingFiles(regexpUrl, mapper, notFoundMethod);
    }
  }

}

module.exports = CreatedCachedServingFilesMethod;
