'use strict'

const assert = require('assert')
const ResponseMock = require('./../../../mock/ResponseMock')

assert(new ResponseMock().on() === undefined)
assert(new ResponseMock().setHeader() === undefined)
