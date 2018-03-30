'use strict'

// interface for REST API method

class Method {

  constructor(regexUrl, type) {
    this.regexUrl = regexUrl;
    this.type = type;
  }

  /*
    To be overriden
  */
  invoke(request, response) {
    throw new Error('method invoke must be overriden');
  }

  match(url) {
    return this.regexUrl.test(url);
  }

}
