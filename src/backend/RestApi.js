'use strict'

const Event = require('@guseyn/cutie').Event;

class RestApi extends Event {

  constructor(...methods) {
    this.methods = methods;
  }

  definedBody(request, response) {
    // work with meth0ds
  }

}
