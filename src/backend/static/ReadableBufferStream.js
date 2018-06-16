const { Readable } = require('stream');

class ReadableBufferStream extends Readable {
  
  constructor(options, buffer) {
    super(options);
    this.buffer = buffer || Buffer.alloc(0);
  }

  _read(size, encoding) {
    if (size < 0) {
      process.nextTick(() => this.emit('error', err));
      return;
    }
    let chunk = this.buffer.slice(0, size);
    this.buffer = this.buffer.slice(size, this.buffer.length);
    if (chunk.length !== 0) {
      this.push(chunk);
    } else {
      process.nextTick(() => this.emit('end'));
    }
  }

}

module.exports = ReadableBufferStream;