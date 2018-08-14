'use strict'

const {
  as
} = require('@guseyn/cutie');
const {
  UrlOfIncomingMessage,
  ResponseWithStatusCode,
  ResponseWithHeader
} = require('@guseyn/cutie-http');
const {
  CreatedReadStream
} = require('@guseyn/cutie-fs');
const {
  ResolvedPath,
  Extname
} = require('@guseyn/cutie-path');
const {
  PipedReadable,
  ReadableWithErrorEvent
} = require('@guseyn/cutie-stream');
const Method = require('./../method/Method');
const FSPathByUrl = require('./FSPathByUrl');
const NotFoundErrorEvent = require('./NotFoundErrorEvent');
const MimeTypeForExtension = require('./MimeTypeForExtension');

class ServingFiles extends Method {

  constructor(regexpUrl, mapper, notFoundMethod) {
    super(regexpUrl, 'GET');
    this.mapper = mapper;
    this.notFoundMethod = notFoundMethod;
  }

  invoke(request, response) {
    new ResolvedPath(
      new FSPathByUrl(
        new UrlOfIncomingMessage(request),
        this.mapper
      )
    ).as('resolvedPath').after(
      new PipedReadable(
        new ReadableWithErrorEvent(
          new CreatedReadStream(
            as('resolvedPath')
          ),
          new NotFoundErrorEvent(
            this.notFoundMethod, request, response
          )
        ),
        new ResponseWithStatusCode(
          new ResponseWithHeader(
            response, 'Content-Type',
            new MimeTypeForExtension(
              new Extname(
                as('resolvedPath')
              )
            )
          ), 200
        )
      )
    ).call();
  }

}

module.exports = ServingFiles;
