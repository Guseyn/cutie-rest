'use strict'

const {
  AsyncObject
} = require('@guseyn/cutie');

class CachedValue extends AsyncObject {

  constructor(cache, key) {
    super(cache, key);
  }

  definedSyncCall() {
    return (cache, key) => {
      return cache[key];
    }
  }

}

module.exports = CachedValue;
