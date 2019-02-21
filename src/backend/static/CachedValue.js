'use strict'

const {
  AsyncObject
} = require('@cuties/cutie')

class CachedValue extends AsyncObject {
  constructor (cache, key) {
    super(cache, key)
  }

  syncCall () {
    return (cache, key) => {
      return cache[key]
    }
  }
}

module.exports = CachedValue
