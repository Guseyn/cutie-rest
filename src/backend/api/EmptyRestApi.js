'use strict'

const Event = require('@guseyn/cutie').Event;
const {
  WrittenResponse,
  EndedResponse
} = require('@guseyn/cutie-http');

class EmptyRestApi extends Event {

  constructor() {
    super();
  }

  definedBody(request, response) {
    new EndedResponse(
      new WrittenResponse(response, 'API is not cofigured.')
    ).call();
  }

}

module.exports = EmptyRestApi;
