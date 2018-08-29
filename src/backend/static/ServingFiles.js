'use strict'

const {
  as
} = require('@cuties/cutie');
const {
  UrlOfIncomingMessage,
  ResponseWithStatusCode,
  ResponseWithHeader
} = require('@cuties/http');
const {
  CreatedReadStream
} = require('@cuties/fs');
const {
  ResolvedPath,
  Extname
} = require('@cuties/path');
const {
  PipedReadable,
  ReadableWithErrorEvent
} = require('@cuties/stream');
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
