'use strict'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const ReadableBufferStream = require('./../../../src/backend/static/ReadableBufferStream')
const CreatedReadableBufferStream = require('./../../../src/backend/static/CreatedReadableBufferStream')

new Assertion(
  new Is(
    new CreatedReadableBufferStream(),
    ReadableBufferStream
  )
).call()
