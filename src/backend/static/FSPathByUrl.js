'use strcit'

const { AsyncObject } = require('@guseyn/cutie');
const path = require('path');

class FSPathByUrl extends AsyncObject {

  constructor(url, mapper) {
    super(url, mapper || ((url) => {
      let paths = url.split('/').filter(path => path !== '');
      return path.join(...paths);
    }));
  }

  definedSyncCall() {
    return (url, mapper) => {
      return mapper(url);
    }
  }

}

module.exports = FSPathByUrl;
