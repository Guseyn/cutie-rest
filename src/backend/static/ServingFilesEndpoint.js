'use strict'

const {
  as
} = require('@cuties/cutie')
const {
  UrlOfIncomingMessage,
  ResponseWithStatusCode,
  ResponseWithHeader
} = require('@cuties/http')
const {
  CreatedReadStream
} = require('@cuties/fs')
const {
  ResolvedPath,
  Extname
} = require('@cuties/path')
const {
  PipedReadable,
  ReadableWithErrorEvent
} = require('@cuties/stream')
const Endpoint = require('./../endpoint/Endpoint')
const FSPathByUrl = require('./FSPathByUrl')
const NotFoundErrorEvent = require('./NotFoundErrorEvent')
const MimeTypeForExtension = require('./MimeTypeForExtension')

class ServingFilesEndpoint extends Endpoint {
  constructor (regexpUrl, mapper, notFoundEndpoint) {
    super(regexpUrl, 'GET')
    this.mapper = mapper
    this.notFoundEndpoint = notFoundEndpoint
  }

  body (request, response) {
    return
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
            this.notFoundEndpoint, request, response
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
    )
  }
}

module.exports = ServingFilesEndpoint
