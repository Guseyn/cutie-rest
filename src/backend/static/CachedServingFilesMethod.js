'use strict'

const {
  as
} = require('@cuties/cutie')
const {
  If, Else
} = require('@cuties/if-else')
const {
  ResponseWithHeader,
  ResponseWithStatusCode,
  UrlOfIncomingMessage
} = require('@cuties/http')
const {
  ConcatenatedBuffers
} = require('@cuties/buffer')
const {
  CreatedReadStream
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
const Method = require('./../method/Method')
const FSPathByUrl = require('./FSPathByUrl')
const NotFoundErrorEvent = require('./NotFoundErrorEvent')
const CacheDataEvent = require('./CacheDataEvent')
const CacheEndEvent = require('./CacheEndEvent')
const IsCached = require('./IsCached')
const CachedValue = require('./CachedValue')
const CreatedReadableBufferStream = require('./CreatedReadableBufferStream')
const MimeTypeForExtension = require('./MimeTypeForExtension')

class CachedServingFilesMethod extends Method {
  constructor (regexpUrl, mapper, notFoundMethod) {
    super(regexpUrl, 'GET')
    this.mapper = mapper
    this.notFoundMethod = notFoundMethod
    this.cache = {}
  }

  invoke (request, response) {
    let okResponse = new ResponseWithStatusCode(
      new ResponseWithHeader(
        response, 'Content-Type',
        new MimeTypeForExtension(
          new Extname(
            as('resolvedPath')
          )
        )
      ), 200
    )
    new ResolvedPath(
      new FSPathByUrl(
        new UrlOfIncomingMessage(request),
        this.mapper
      )
    ).as('resolvedPath').after(
      new If(
        new IsCached(this.cache, as('resolvedPath')),
        new PipedReadable(
          new CreatedReadableBufferStream(
            new ConcatenatedBuffers(
              new CachedValue(this.cache, as('resolvedPath'))
            )
          ), okResponse
        ),
        new Else(
          new PipedReadable(
            new ReadableWithEndEvent(
              new ReadableWithDataEvent(
                new ReadableWithErrorEvent(
                  new CreatedReadStream(
                    as('resolvedPath')
                  ),
                  new NotFoundErrorEvent(
                    this.notFoundMethod, request, response
                  )
                ),
                new CacheDataEvent(this.cache, as('resolvedPath'))
              ),
              new CacheEndEvent(this.cache, as('resolvedPath'))
            ),
            okResponse
          )
        )
      )
    ).call()
  }
}

module.exports = CachedServingFilesMethod
