'use strict'

const {
  as
} = require('@guseyn/cutie');
const {
  If, Else
} = require('@guseyn/cutie-if-else');
const {
  ResponseWithHeader,
  ResponseWithStatusCode,
  UrlOfIncomingMessage
} = require('@guseyn/cutie-http');
const {
  ConcatenatedBuffers
} = require('@guseyn/cutie-buffer');
const {
  CreatedReadStream
} = require('@guseyn/cutie-fs');
const {
  ResolvedPath,
  Extname
} = require('@guseyn/cutie-path');
const {
  PipedReadable,
  ReadableWithErrorEvent,
  ReadableWithDataEvent,
  ReadableWithEndEvent
} = require('@guseyn/cutie-stream');
const Method = require('./../method/Method');
const FSPathByUrl = require('./FSPathByUrl');
const NotFoundErrorEvent = require('./NotFoundErrorEvent');
const CacheDataEvent = require('./CacheDataEvent');
const CacheEndEvent = require('./CacheEndEvent');
const IsCached = require('./IsCached');
const CachedValue = require('./CachedValue');
const CreatedReadableBufferStream = require('./CreatedReadableBufferStream');
const MimeTypeForExtension = require('./MimeTypeForExtension');

class CachedServingFiles extends Method {

  constructor(regexpUrl, mapper, notFoundMethod) {
    super(regexpUrl, 'GET');
    this.mapper = mapper;
    this.notFoundMethod = notFoundMethod;
    this.cache = {};
  }

  invoke(request, response) {
    let okResponse = new ResponseWithStatusCode(
      new ResponseWithHeader(
        response, 'Content-Type',
        new MimeTypeForExtension(
          new Extname(
            as('resolvedPath')
          )
        )
      ), 200
    );
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
    ).call();
  }

}

module.exports = CachedServingFiles;
