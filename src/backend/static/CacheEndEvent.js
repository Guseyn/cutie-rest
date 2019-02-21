'use strict'

const {
  AsyncObject
} = require('@cuties/cutie')

class CacheEndEvent extends AsyncObject {
  constructor (cache, key) {
    super(cache, key)
  }

  syncCall () {
    return (cache, key) => {
      return () => {
        if (!cache[key]) {
          cache[key] = []
        }
      }
    }
  }
}

module.exports = CacheEndEvent
