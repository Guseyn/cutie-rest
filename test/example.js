'use strict'

const path = require('path');
const Backend = require('./../src/backend/Backend');
const RestApi = require('./../src/backend/api/RestApi');
const CachedServingFiles = require('./../src/backend/static/CachedServingFiles');
const GeneratedResponse = require('./GeneratedResponse');
const CustomNotFoundMethod = require('./CustomNotFoundMethod');

const notFoundMethod = new CustomNotFoundMethod(new RegExp(/\/not-found/));

const mapper = (url) => {
  let paths = url.split('/').filter(path => path !== '');
  return path.join(...paths);
}

new Backend(8080, '127.0.0.1', new RestApi(
  new GeneratedResponse(new RegExp(/\/response/), 'GET'),
  new CachedServingFiles(new RegExp(/\/files/), mapper, notFoundMethod),
  notFoundMethod
)).run();
