'use strict'

const {
  AsyncObject
} = require('@cuties/cutie')

class IsCached extends AsyncObject {
  constructor (cache, key) {
    super(cache, key)
  }

  definedSyncCall () {
    return (cache, key) => {
      return cache[key] !== undefined
    }
  }
}

module.exports = IsCached
