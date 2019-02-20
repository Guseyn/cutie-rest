'use strict'

const { StrictEqualAssertion, DeepStrictEqualAssertion } = require('@cuties/assert')
const { BufferLength } = require('@cuties/buffer')
const ReadableBufferStream = require('./../../../src/backend/static/ReadableBufferStream')

const buffer = Buffer.alloc(10)
const stream = new ReadableBufferStream(buffer)

stream.on('error', (error) => {
  new DeepStrictEqualAssertion(
    error, new Error('size must be more than 0')
  ).call()
})

stream._read(5)

new StrictEqualAssertion(
  new BufferLength(stream.buffer), 5
).call()

stream._read(-3)

const emptyStream = new ReadableBufferStream()

new StrictEqualAssertion(
  new BufferLength(emptyStream.buffer), 0
).call()
