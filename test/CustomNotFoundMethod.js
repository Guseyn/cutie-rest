'use strict'

const NotFoundMethod = require('./../src/backend/method/NotFoundMethod');

class CustomNotFoundMethod extends NotFoundMethod {

  constructor(regexpUrl) {
    super(regexpUrl);
  }

}

module.exports = CustomNotFoundMethod;
