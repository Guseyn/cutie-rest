'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class MatchedMethod extends AsyncObject {

  constructor(methods, type, url) {
    super(methods, type, url);
  }

  definedSyncCall() {
    return (methods, type, url) => {
      let matchedMethods = methods.filter(method => {
        return method.match(type, url) ;
      });
      if (matchedMethods.length === 0) {
        // 404
        throw new Error(`no methods matchs to url:${url} with type of method:${type}`);
      }
      if (matchedMethods.length > 1) {
        throw new Error(`url ${url} matches to more than one method with type of method:${type}`);
      }
      return matchedMethods[0];
    }
  }

}

module.exports = MatchedMethod;
