'use strict'

const Event = require('@cuties/cutie').Event;

class ErrorEvent extends Event {

  constructor() {
    super();
  }

  definedBody(error) {
    console.log(error);
  }

}

module.exports = ErrorEvent;
