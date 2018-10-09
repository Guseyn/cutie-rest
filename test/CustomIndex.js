'use strict'

const { Index } = require('./../index');;

class CustomIndex extends Index {

  constructor() {
    super();
  }

  invoke(request, response) {
    super.invoke(request, response);
  }

}

module.exports = CustomIndex;
