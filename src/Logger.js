'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class Logger extends AsyncObject {

  constructor(obj) {
    super(obj);
  }

  definedSyncCall() {
    return (obj) => {
      console.log(obj);
      return obj;
    }
  }

}

module.exports = Logger;
