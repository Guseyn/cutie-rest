'use strict'

const { NotFoundMethod } = require('./../index');

class CustomNotFoundMethod extends NotFoundMethod {

  constructor(regexpUrl) {
    super(regexpUrl);
  }

  invoke(request, response) {
    super.invoke(request, response);
  }

}

module.exports = CustomNotFoundMethod;
