'use strict'

const path = require('path');
const {
  Backend,
  RestApi,
  CreatedServingFilesMethod,
  CreatedCachedServingFilesMethod,
  ServingFiles,
  CachedServingFiles
} = require('./../index');
const SimpleResponseOnGETRequest = require('./SimpleResponseOnGETRequest');
const SimpleResponseOnPOSTRequest = require('./SimpleResponseOnPOSTRequest');
const CustomNotFoundMethod = require('./CustomNotFoundMethod');
const CustomIndex = require('./CustomIndex');

const notFoundMethod = new CustomNotFoundMethod(new RegExp(/\/not-found/));

const mapper = (url) => {
  let paths = url.split('/').filter(path => path !== '');
  return path.join(...paths);
}

new Backend(
  8000, '127.0.0.1', new RestApi(
    new CustomIndex(),
    new SimpleResponseOnGETRequest(new RegExp(/^\/get/), 'GET'),
    new SimpleResponseOnPOSTRequest(new RegExp(/^\/post/), 'POST'),
    new CreatedCachedServingFilesMethod(new RegExp(/^\/files/), mapper, notFoundMethod),
    notFoundMethod
  )
).call();
