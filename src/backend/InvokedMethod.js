'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class InvokedMethod extends AsyncObject {

  constructor(method, request, response) {
    super(method);
  }

  definedSyncCall() {
    return (method, request, response) => {
      method.invoke(request, response);
      return method;
    }
  }

}

module.exports = InvokedMethod;
