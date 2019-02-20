'use strict'

const { Assertion } = require('@cuties/assert')
const { IsBoolean } = require('@cuties/is')
const IsCached = require('./../../../src/backend/static/IsCached')

new Assertion(
  new IsBoolean(
    new IsCached(
      { key: 'value' }, 'key'
    )
  )
).call()
