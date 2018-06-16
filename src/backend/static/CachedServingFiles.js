'use strict'

const {
  as
} = require('@guseyn/cutie');
const {
  If, Else
} = require('@guseyn/cutie-if-else');
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

class CachedServingFiles extends Method {

  constructor(regexpUrl, mapper, notFoundMethod) {
    super(regexpUrl, 'GET');
    this.mapper = mapper;
    this.notFoundMethod = notFoundMethod;
    this.cache = {};
  }

  invoke(request, response) {
    new FSPathByUrl(
      new UrlOfIncomingMessage(request),
      this.mapper
    ).as('path').after(
      new If(
        new IsCached(this.cache, as('path')),
        new PipedReadable(
          new CreatedReadableBufferStream(
            {}, new CachedValue(this.cache, as('path'))
          ), response
        ),
        new Else(
          new PipedReadable(
            new ReadableWithEndEvent(
              new ReadableWithDataEvent(
                new ReadableWithErrorEvent(
                  new CreatedReadStream(
                    new ResolvedPath(
                      as('path')
                    )
                  ), 
                  new NotFoundErrorEvent(
                    this.notFoundMethod, request, response
                  )
                ), new CacheDataEvent(this.cache, as('path'))
              ), new CacheEndEvent(this.cache, as('path'))
            ), new ResponseWithWrittenHead(response, 200, 'ok')
          )
        )
      )
    ).call();
  }

}

module.exports = CachedServingFiles;
