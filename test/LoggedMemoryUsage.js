'use strict'

const AsyncObject = require('@guseyn/cutie').AsyncObject;

class LoggedMemoryUsage extends AsyncObject {

  constructor(...objs) {
    super(...objs);
  }

  definedSyncCall() {
    return (...objs) => {
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
      return objs;
    }
  }

}

module.exports = LoggedMemoryUsage;
