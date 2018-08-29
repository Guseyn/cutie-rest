'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject;

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
