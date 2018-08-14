'use strict'

const {
  AsyncObject
} = require('@guseyn/cutie');

class CacheEndEvent extends AsyncObject {

  constructor(cache, key) {
    super(cache, key);
  }

  definedSyncCall() {
    return (cache, key) => {
      return () => {
        if (!cache[key]) {
          cache[key] = [];
        }
      }
    }
  }

}

module.exports = CacheEndEvent;
