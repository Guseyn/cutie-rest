'use strict'

const { AsyncObject } = require('@guseyn/cutie');
const Method = require('./../method/Method');

const {
  ResponseWithWrittenHead,
  UrlOfIncomingMessage
} = require('@guseyn/cutie-http');
const {
  CreatedReadStream
} = require('@guseyn/cutie-fs');
const {
  PipedReadable
} = require('@guseyn/cutie-stream');
const {
  ResolvedPath
} = require('@guseyn/cutie-path');
const FSPathByUrl = require('./FSPathByUrl');

class ServingFiles extends Method {

  constructor(regexpUrl, type, dir) {
    super(regexpUrl, type);
    this.dir = dir;
  }

  invoke(request, response) {
    if (!this.dir) {
      throw new Error('Serving directory is not specified');
    }
    new PipedReadable(
      new CreatedReadStream(
        new ResolvedPath(
          this.dir, new FSPathByUrl(
            new UrlOfIncomingMessage(request)
          )
        )
      ), response
    ).call();
  }

}

module.exports = ServingFiles;
