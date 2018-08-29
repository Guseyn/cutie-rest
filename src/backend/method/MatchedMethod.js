'use strict'

const AsyncObject = require('@cuties/cutie').AsyncObject;
const NotFoundMethod = require('./NotFoundMethod');

class MatchedMethod extends AsyncObject {

  constructor(methods, type, url) {
    super(methods, type, url);
  }

  definedSyncCall() {
    return (methods, type, url) => {
      let matchedMethod = methods.find(method => {
        return method.match(type, url);
      });
      if (!matchedMethod) {
        // 404
        let notFoundMethod = methods.find(method => {
          return method instanceof NotFoundMethod;
        });
        if (!notFoundMethod) {
          throw new Error(`no methods matchs to url:${url} with type of method: ${type}`);
        }
        return notFoundMethod;
      } else {
        return matchedMethod;
      }
    }
  }

}

module.exports = MatchedMethod;
