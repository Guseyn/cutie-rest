'use strict'

const domain = require('domain')
const cluster = require('cluster')
const path = require('path')
const {
  ClusteredBackendWith505ErrorEvent,
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
const ErrorEndpoint = require('./example/ErrorEndpoint')

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

new ClusteredBackendWith505ErrorEvent(
  domain,
  cluster,
  'http',
  8000,
  '127.0.0.1',
  new RestApi(
    new CustomIndexEndpoint(),
    new SimpleResponseOnGETRequest(new RegExp(/^\/get/), 'GET'),
    new ErrorEndpoint(new RegExp(/^\/error/), 'GET'),
    new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
    new SimpleProgressEndpoint(new RegExp(/^\/progress/), 'POST'),
    new ServingFilesEndpoint(new RegExp(/^\/files/), mapper, {}, notFoundEndpoint),
    new CachedServingFilesEndpoint(new RegExp(/^\/cached/), cacheMapper, {}, notFoundEndpoint),
    notFoundEndpoint,
    internalServerErrorEndpoint
  )
).call()
