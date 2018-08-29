'use strict'

const {
  AsyncObject
} = require('@cuties/cutie');

class CacheDataEvent extends AsyncObject {

  constructor(cache, key) {
    super(cache, key);
  }

  definedSyncCall() {
    return (cache, key) => {
      return (chunk) => {
        if (!cache[key]) {
          cache[key] = [];
        }
        cache[key].push(chunk);
      }
    }
  }

}

module.exports = CacheDataEvent;
