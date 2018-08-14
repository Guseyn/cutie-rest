'use strict'

const {
  AsyncObject
} = require('@guseyn/cutie');
const ReadableBufferStream = require('./ReadableBufferStream');

// Represented result is ReadableBufferStream
class CreatedReadableBufferStream extends AsyncObject {

  constructor(buffer, options) {
    super(buffer, options);
  }

  definedSyncCall() {
    return (buffer, options) => {
      return new ReadableBufferStream(buffer, options);
    }
  }

}

module.exports = CreatedReadableBufferStream;
