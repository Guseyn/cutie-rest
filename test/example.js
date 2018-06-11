'use strict'

const Backend = require('./../src/backend/Backend');
const RestApi = require('./../src/backend/RestApi');

const GeneratedResponse = require('./GeneratedResponse');

new Backend(8080, '127.0.0.1').runWithApi(
  new RestApi(
    new GeneratedResponse(new RegExp(/\//), 'GET')
  )
);
