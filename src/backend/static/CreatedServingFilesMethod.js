'use strict'

const { AsyncObject } = require('@cuties/cutie');
const ServingFiles = require('./ServingFiles');

class CreatedServingFilesMethod extends AsyncObject {

  constructor(regexpUrl, mapper, notFoundMethod) {
    super(regexpUrl, mapper, notFoundMethod);
  }

  definedSyncCall() {
    return (regexpUrl, mapper, notFoundMethod) => {
      return new ServingFiles(regexpUrl, mapper, notFoundMethod);
    }
  }

}

module.exports = CreatedServingFilesMethod;
