'use strict'

const {
  ResponseWithWrittenHead,
  UrlOfIncomingMessage
} = require('@guseyn/cutie-http');
const {
  CreatedReadStream
} = require('@guseyn/cutie-fs');
const {
  ResolvedPath
} = require('@guseyn/cutie-path');
const {
  PipedReadable,
  ReadableWithErrorEvent
} = require('@guseyn/cutie-stream');
const Method = require('./../method/Method');
const FSPathByUrl = require('./FSPathByUrl');
const NotFoundErrorEvent = require('./NotFoundErrorEvent');

class ServingFiles extends Method {

  constructor(regexpUrl, mapper, notFoundMethod) {
    super(regexpUrl, 'GET');
    this.mapper = mapper;
    this.notFoundMethod = notFoundMethod;
  }

  invoke(request, response) {
    new PipedReadable(
      new ReadableWithErrorEvent(
        new CreatedReadStream(
          new ResolvedPath(
            new FSPathByUrl(
              new UrlOfIncomingMessage(request),
              this.mapper
            )
          )
        ), 
        new NotFoundErrorEvent(
          this.notFoundMethod, request, response
        )
      ), new ResponseWithWrittenHead(response, 200, 'ok')
    ).call();
  }

}

module.exports = ServingFiles;
