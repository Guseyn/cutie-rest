'use strcit'

const { AsyncObject } = require('@cuties/cutie');

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
