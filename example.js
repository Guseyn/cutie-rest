'use strict'

const path = require('path')
const {
  Backend,
  RestApi,
  ServingFilesEndpoint,
  CachedServingFilesEndpoint
} = require('./index');
const {
  CreatedOptions
} = require('@cuties/https')
const { ReadDataByPath } = require('@cuties/fs')
const SimpleResponseOnGETRequest = require('./example/SimpleResponseOnGETRequest')
const SimpleResponseOnPOSTRequest = require('./example/SimpleResponseOnPOSTRequest')
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
    new ServingFilesEndpoint(new RegExp(/^\/files/), mapper, notFoundEndpoint),
    new CachedServingFilesEndpoint(new RegExp(/^\/cached/), cacheMapper, notFoundEndpoint),
    notFoundEndpoint,
    internalServerErrorEndpoint
  ), new CreatedOptions(
    'key', new ReadDataByPath('./example/pem/key.pem'),
    'cert', new ReadDataByPath('./example/pem/cert.pem')
  )
).call()
