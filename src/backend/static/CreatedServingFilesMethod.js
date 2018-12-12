'use strict'

const { AsyncObject } = require('@cuties/cutie');
const ServingFilesMethod = require('./ServingFilesMethod');

class CreatedServingFilesMethod extends AsyncObject {

  constructor(regexpUrl, mapper, notFoundMethod) {
    super(regexpUrl, mapper, notFoundMethod);
  }

  definedSyncCall() {
    return (regexpUrl, mapper, notFoundMethod) => {
      return new ServingFilesMethod(regexpUrl, mapper, notFoundMethod);
    }
  }

}

module.exports = CreatedServingFilesMethod;
