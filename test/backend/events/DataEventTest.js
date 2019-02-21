'use strict'

const { DeepStrictEqualAssertion } = require('@cuties/assert')
const DataEvent = require('./../../../src/backend/event/DataEvent')

let body = []
new DataEvent(body).body('data')
new DeepStrictEqualAssertion(
  body,
  [ 'data' ]
).call()
