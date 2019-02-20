'use strict'

const { StrictEqualAssertion } = require('@cuties/assert')
const CachedValue = require('./../../../src/backend/static/CachedValue')

new StrictEqualAssertion(
  new CachedValue(
    { key: 'value' }, 'key'
  ), 'value'
).call()
