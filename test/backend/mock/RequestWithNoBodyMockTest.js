'use strict'

const assert = require('assert')
const RequestWithNoBodyMock = require('./../../../mock/RequestWithNoBodyMock')

assert(new RequestWithNoBodyMock().on() === undefined)
assert(new RequestWithNoBodyMock().write() === undefined)
