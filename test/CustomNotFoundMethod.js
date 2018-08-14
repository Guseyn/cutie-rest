'use strict'

const NotFoundMethod = require('./../src/backend/method/NotFoundMethod');

class CustomNotFoundMethod extends NotFoundMethod {

  constructor(regexpUrl) {
    super(regexpUrl);
  }

  invoke(request, response) {
    super.invoke(request, response);
  }

}

module.exports = CustomNotFoundMethod;
