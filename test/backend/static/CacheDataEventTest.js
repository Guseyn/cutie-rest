'use strict'

const { DeepStrictEqualAssertion } = require('@cuties/assert')
const CacheDataEvent = require('./../../../src/backend/static/CacheDataEvent')

let cache = {}
new CacheDataEvent(cache, 'key').syncCall()(cache, 'key')('data')
new DeepStrictEqualAssertion(
  cache,
  {
    key: [ 'data' ]
  }
).call()

new CacheDataEvent(cache, 'key').syncCall()(cache, 'key')('data')
new DeepStrictEqualAssertion(
  cache,
  {
    key: [ 'data', 'data' ]
  }
).call()
