const { Readable } = require('stream')

class ReadableBufferStream extends Readable {
  constructor (buffer, options) {
    super(options)
    this.buffer = buffer || Buffer.alloc(0)
  }

  _read (size, encoding) {
    if (size < 0) {
      process.nextTick(() => this.emit('error', new Error('size must be more than 0')))
      return
    }
    let chunk = this.buffer.slice(0, size)
    this.buffer = this.buffer.slice(size, this.buffer.length)
    if (chunk instanceof Buffer && chunk.length !== 0) {
      this.push(chunk)
    } else {
      this.push(null)
      // process.nextTick(() => this.emit('end'));
    }
  }
}

module.exports = ReadableBufferStream
