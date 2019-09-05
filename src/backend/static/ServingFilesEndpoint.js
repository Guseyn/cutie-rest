'use strict'

const {
  as
} = require('@cuties/cutie')
const {
  If, Else
} = require('@cuties/if-else')
const {
  UrlOfIncomingMessage,
  ResponseWithStatusCode,
  ResponseWithHeader,
  ResponseWithHeaders
} = require('@cuties/http')
const {
  CreatedReadStream,
  StatsByPath,
  Size,
  DoesFileExistSync,
  IsFile
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
  constructor (regexpUrl, mapper, headers, notFoundEndpoint) {
    super(regexpUrl, 'GET')
    this.mapper = mapper
    this.headers = headers
    this.notFoundEndpoint = notFoundEndpoint
  }

  body (request, response) {
    return new ResolvedPath(
      new FSPathByUrl(
        new UrlOfIncomingMessage(request),
        this.mapper
      )
    ).as('resolvedPath').after(
      new If(
        new DoesFileExistSync(
          as('resolvedPath')
        ),
        new If(
          new IsFile(
            new StatsByPath(
              as('resolvedPath')
            )
          ),
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
              new ResponseWithHeaders(
                new ResponseWithHeader(
                  new ResponseWithHeader(
                    response, 'Content-Type',
                    new MimeTypeForExtension(
                      new Extname(
                        as('resolvedPath')
                      )
                    )
                  ), 'Content-Length',
                  new Size(
                    new StatsByPath(
                      as('resolvedPath')
                    )
                  )
                ), this.headers
              ), 200
            )
          ),
          new Else(
            this.notFoundEndpoint.body(request, response)
          )
        ),
        new Else(
          this.notFoundEndpoint.body(request, response)
        )
      )
    )
  }
}

module.exports = ServingFilesEndpoint
