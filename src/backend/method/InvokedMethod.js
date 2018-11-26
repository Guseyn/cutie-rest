'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject;

class InvokedMethod extends AsyncObject {

  constructor(method, request, response, ...args) {
    super(method, request, response, ...args);
  }

  definedSyncCall() {
    return (method, request, response, ...args) => {
      method.invoke(request, response, ...args);
      return method;
    }
  }

}

module.exports = InvokedMethod;
