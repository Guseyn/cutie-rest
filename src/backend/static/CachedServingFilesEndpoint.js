'use strict'

const {
  as
} = require('@cuties/cutie')
const {
  If, Else, ElseIf
} = require('@cuties/if-else')
const {
  ResponseWithHeader,
  ResponseWithHeaders,
  ResponseWithStatusCode,
  UrlOfIncomingMessage
} = require('@cuties/http')
const {
  ConcatenatedBuffers,
  ByteLengthOfBuffer
} = require('@cuties/buffer')
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
  ReadableWithErrorEvent,
  ReadableWithDataEvent,
  ReadableWithEndEvent
} = require('@cuties/stream')
const {
  Created
} = require('@cuties/created')
const Endpoint = require('./../endpoint/Endpoint')
const FSPathByUrl = require('./FSPathByUrl')
const NotFoundErrorEvent = require('./NotFoundErrorEvent')
const CacheDataEvent = require('./CacheDataEvent')
const CacheEndEvent = require('./CacheEndEvent')
const IsCached = require('./IsCached')
const CachedValue = require('./CachedValue')
const ReadableBufferStream = require('./ReadableBufferStream')
const MimeTypeForExtension = require('./MimeTypeForExtension')

class CachedServingFilesEndpoint extends Endpoint {
  constructor (regexpUrl, mapper, headers, notFoundEndpoint) {
    super(regexpUrl, 'GET')
    this.mapper = mapper
    this.notFoundEndpoint = notFoundEndpoint
    this.headers = headers
    this.cache = {}
  }

  body (request, response) {
    let okResponse = new ResponseWithStatusCode(
      new ResponseWithHeaders(
        new ResponseWithHeader(
          response, 'Content-Type',
          new MimeTypeForExtension(
            new Extname(
              as('resolvedPath')
            )
          )
        ), this.headers
      ), 200
    )
    return new ResolvedPath(
      new FSPathByUrl(
        new UrlOfIncomingMessage(request),
        this.mapper
      )
    ).as('resolvedPath').after(
      new If(
        new IsCached(this.cache, as('resolvedPath')),
        new ConcatenatedBuffers(
          new CachedValue(this.cache, as('resolvedPath'))
        ).as('cachedFileContent').after(
          new PipedReadable(
            new Created(
              ReadableBufferStream,
              as('cachedFileContent')
            ),
            new ResponseWithHeader(
              okResponse, 'Content-Length',
              new ByteLengthOfBuffer(
                as('cachedFileContent')
              )
            )
          )
        ),
        new ElseIf(
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
              new ReadableWithEndEvent(
                new ReadableWithDataEvent(
                  new ReadableWithErrorEvent(
                    new CreatedReadStream(
                      as('resolvedPath')
                    ),
                    new NotFoundErrorEvent(
                      this.notFoundEndpoint, request, response
                    )
                  ),
                  new CacheDataEvent(this.cache, as('resolvedPath'))
                ),
                new CacheEndEvent(this.cache, as('resolvedPath'))
              ),
              new ResponseWithHeader(
                okResponse, 'Content-Length',
                new Size(
                  new StatsByPath(
                    as('resolvedPath')
                  )
                )
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
    )
  }
}

module.exports = CachedServingFilesEndpoint
