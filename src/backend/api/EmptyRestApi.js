'use strict'

const Event = require('@cuties/cutie').Event;
const {
  WrittenResponse,
  EndedResponse
} = require('@cuties/http');

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
