'use strict'

const path = require('path');
const {
  Backend,
  RestApi,
  CreatedServingFilesMethod,
  CreatedCachedServingFilesMethod
} = require('./index');
const {
  CreatedOptions
} = require('@cuties/https');
const { ReadDataByPath } = require('@cuties/fs');
const SimpleResponseOnGETRequest = require('./example/SimpleResponseOnGETRequest');
const SimpleResponseOnPOSTRequest = require('./example/SimpleResponseOnPOSTRequest');
const CustomNotFoundMethod = require('./example/CustomNotFoundMethod');
const CustomInternalServerErrorMethod = require('./example/CustomInternalServerErrorMethod');
const CustomIndexMethod = require('./example/CustomIndexMethod');

const notFoundMethod = new CustomNotFoundMethod(new RegExp(/\/not-found/));
const internalServerErrorMethod = new CustomInternalServerErrorMethod();

const mapper = (url) => {
  let parts = url.split('/').filter(part => part !== '');
  return path.join(...parts);
}

const cacheMapper = (url) => {
  let parts = url.split('/').filter(part => part !== '').slice(1);
  parts.unshift('files');
  return path.join(...parts);
}

new Backend(
  'https', 
  8000, 
  '127.0.0.1',
  new RestApi(
    new CustomIndexMethod(),
    new SimpleResponseOnGETRequest(new RegExp(/^\/get/), 'GET'),
    new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
    new CreatedServingFilesMethod(new RegExp(/^\/files/), mapper, notFoundMethod),
    new CreatedCachedServingFilesMethod(new RegExp(/^\/cached/), cacheMapper, notFoundMethod),
    notFoundMethod,
    internalServerErrorMethod
  ), new CreatedOptions(
    'key', new ReadDataByPath('./example/pem/key.pem'),
    'cert', new ReadDataByPath('./example/pem/cert.pem')
  )
).call();
