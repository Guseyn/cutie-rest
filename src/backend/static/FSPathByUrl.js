'use strcit'

const { AsyncObject } = require('@guseyn/cutie');

class FSPathByUrl extends AsyncObject {

  constructor(url, mapper) {
    super(url, mapper);
  }

  definedSyncCall() {
    return (url, mapper) => {
      return mapper(url);
    }
  }

}

module.exports = FSPathByUrl;
