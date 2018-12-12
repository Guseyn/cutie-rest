'use strict'

const path = require('path');
const {
  Backend,
  RestApi,
  CreatedServingFilesMethod,
  CreatedCachedServingFilesMethod
} = require('./../index');
const {
  CreatedOptions
} = require('@cuties/https');
const { ReadDataByPath } = require('@cuties/fs');
const SimpleResponseOnGETRequest = require('./SimpleResponseOnGETRequest');
const SimpleResponseOnPOSTRequest = require('./SimpleResponseOnPOSTRequest');
const CustomNotFoundMethod = require('./CustomNotFoundMethod');
const CustomInternalServerErrorMethod = require('./CustomInternalServerErrorMethod');
const CustomIndexMethod = require('./CustomIndexMethod');

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
    'key', new ReadDataByPath('./test/pem/key.pem'),
    'cert', new ReadDataByPath('./test/pem/cert.pem')
  )
).call();
