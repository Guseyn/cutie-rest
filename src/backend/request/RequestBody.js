'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class RequestBody extends AsyncObject {

  constructor(request) {
    super(request);
  }

  definedSyncCall() {
    return (request) => {
      return request.body;
    }
  }

}

module.exports = RequestBody;
