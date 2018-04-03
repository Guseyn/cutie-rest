'use strict'

const Backend = require('./../src/backend/Backend');
const RestApi = require('./../src/backend/RestApi');

new Backend(8080, '127.0.0.1').runWithApi(new RestApi());