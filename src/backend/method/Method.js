'use strict'

// interface for REST API method

class Method {

  constructor(regexpUrl, type) {
    this.regexpUrl = regexpUrl;
    this.type = type;
  }

  /*
    To be overriden
  */
  invoke(request, response) {
    throw new Error('method invoke must be overriden');
  }

  match(type, url) {
    return this.type === type && this.regexpUrl.test(url);
  }

}

module.exports = Method;
