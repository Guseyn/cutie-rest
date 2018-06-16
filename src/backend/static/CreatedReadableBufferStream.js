'use strict'

const {
  AsyncObject
} = require('@guseyn/cutie');
const ReadableBufferStream = require('./ReadableBufferStream');

// Represented result is ReadableBufferStream
class CreatedReadableBufferStream extends AsyncObject {

  constructor(options, buffer) {
    super(options, buffer);
  }

  definedSyncCall() {
    return (options, buffer) => {
      return new ReadableBufferStream(options, buffer);
    }
  }

}

module.exports = CreatedReadableBufferStream;
