'use strict'

const Event = require('@guseyn/cutie').Event;

class DataEvent extends Event {

  constructor(body) {
    super();
    this.body = body;
  }

  definedBody(data) {
    this.body.push(data);
  }

}

module.exports = DataEvent;
