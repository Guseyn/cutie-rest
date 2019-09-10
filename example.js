'use strict'

const path = require('path')
const {
  Backend,
  RestApi,
  ServingFilesEndpoint,
  CachedServingFilesEndpoint,
  CORSEndpoint
} = require('./index')
const SimpleResponseOnGETRequest = require('./example/SimpleResponseOnGETRequest')
const SimpleResponseOnPOSTRequest = require('./example/SimpleResponseOnPOSTRequest')
const SimpleResponseOnPUTRequest = require('./example/SimpleResponseOnPUTRequest')
const SimpleProgressEndpoint = require('./example/SimpleProgressEndpoint')
const CustomNotFoundEndpoint = require('./example/CustomNotFoundEndpoint')
const CustomInternalServerErrorEndpoint = require('./example/CustomInternalServerErrorEndpoint')
const CustomIndexEndpoint = require('./example/CustomIndexEndpoint')

const notFoundEndpoint = new CustomNotFoundEndpoint(new RegExp(/\/not-found/))
const internalServerErrorEndpoint = new CustomInternalServerErrorEndpoint()

const mapper = (url) => {
  let parts = url.split('/').filter(part => part !== '')
  return path.join(...parts)
}

const cacheMapper = (url) => {
  let parts = url.split('/').filter(part => part !== '').slice(1)
  parts.unshift('files')
  return path.join(...parts)
}

new Backend(
  'http',
  8000,
  '127.0.0.1',
  new RestApi(
    new CustomIndexEndpoint(),
    new SimpleResponseOnGETRequest(new RegExp(/^\/get/), 'GET'),
    new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
    new SimpleProgressEndpoint(new RegExp(/^\/progress/), 'POST'),
    new ServingFilesEndpoint(new RegExp(/^\/files/), mapper, {}, notFoundEndpoint),
    new CachedServingFilesEndpoint(new RegExp(/^\/cached/), cacheMapper, {}, notFoundEndpoint),
    notFoundEndpoint,
    internalServerErrorEndpoint
  )
).call()

new Backend(
  'http',
  8001,
  '127.0.0.1',
  new RestApi(
    new CustomIndexEndpoint(),
    new CORSEndpoint(
      new SimpleResponseOnGETRequest(new RegExp(/^\/get/), 'GET'),
      {
        allowedOrigins: [ 'http://127.0.0.1:8000' ],
        allowedMethods: [ 'GET, OPTIONS' ],
        allowedHeaders: [ ]
      }
    ),
    new CORSEndpoint(
      new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
      {
        allowedOrigins: [ 'http://127.0.0.1:8000' ],
        allowedMethods: [ 'POST, OPTIONS' ],
        allowedHeaders: [ ],
        allowedCredentials: true,
        maxAge: 86400
      }
    ),
    new CORSEndpoint(
      new SimpleResponseOnPUTRequest(new RegExp(/^\/put/), 'PUT'),
      {
        allowedOrigins: [ 'http://127.0.0.1:8000' ],
        allowedMethods: [ 'PUT, OPTIONS' ],
        allowedHeaders: [ ],
        allowedCredentials: true,
        maxAge: 86400
      }
    ),
    notFoundEndpoint,
    internalServerErrorEndpoint
  )
).call()
