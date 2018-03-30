'use strict'

const Event = require('@guseyn/cutie').Event;

class RestApi extends Event {

  constructor(...methods) {
    this.methods = methods;
  }

  definedBody(request, response) {
    let machedMethods = this.methods.filter(method => {
      return method.match(/* replace this all with declarative code */);
    });
  }

}
