'use strict'

const { ExecutedTests } = require('test-executor')

new ExecutedTests(
  './test'
).call()
