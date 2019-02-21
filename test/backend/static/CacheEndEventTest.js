'use strict'

const { DeepStrictEqualAssertion } = require('@cuties/assert')
const CacheDataEvent = require('./../../../src/backend/static/CacheDataEvent')
const CacheEndEvent = require('./../../../src/backend/static/CacheEndEvent')

let cache = {}
new CacheEndEvent(cache, 'key').syncCall()(cache, 'key')()
new DeepStrictEqualAssertion(
  cache,
  {
    key: []
  }
).call()

new CacheDataEvent(cache, 'key').syncCall()(cache, 'key')('data')
new CacheEndEvent(cache, 'key').syncCall()(cache, 'key')()
new DeepStrictEqualAssertion(
  cache,
  {
    key: [ 'data' ]
  }
).call()
