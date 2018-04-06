'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

// Represented result is request
class RequestWithDataEvent extends AsyncObject {

  constructor(request, biffer, event) {
    super(request, event);
  }

  definedAsyncCall() {
    return (request, event) => {
      request.on('data', event);
      return request;
    }
  }

}

module.exports = RequestWithDataEvent;
