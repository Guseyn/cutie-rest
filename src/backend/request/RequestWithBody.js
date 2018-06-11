'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class RequestWithBody extends AsyncObject {

  constructor(request, body) {
    super(request, body);
  }

  definedSyncCall() {
    return (request, body) => {
      request.body = body;
      return request;
    }
  }

}

module.exports = RequestWithBody;
