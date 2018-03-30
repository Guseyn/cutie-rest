'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class MatchedMethod extends AsyncObject {

  constructor(methods, url) {
    super(methods, url);
  }

  definedSyncCall() {
    return (methods, url) => {
      let matchedMethods = methods.filter(method => {
        return method.match(url);
      });
      if (matchedMethods.length === 0) {
        // 404
        throw new Error(`no methods matchs to url:${url}`);
      }
      if (matchedMethods.length > 1) {
        throw new Error(`url ${url} matches to more than one method`);
      }
      return matchedMethods[0];
    }
  }

}

module.exports = MatchedMethod;
