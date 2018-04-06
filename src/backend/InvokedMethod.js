'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class InvokedMethod extends AsyncObject {

  constructor(method, headers, type, url, body, response) {
    super(method, headers, type, url, body, response);
  }

  definedSyncCall() {
    return (method, headers, type, url, body, response) => {
      method.invoke(headers, type, url, body, response);
      return method;
    }
  }

}

module.exports = InvokedMethod;
