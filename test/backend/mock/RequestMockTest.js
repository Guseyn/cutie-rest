'use strict'

const assert = require('assert')
const RequestMock = require('./../../../mock/RequestMock')

assert(new RequestMock().on() === undefined)
assert(new RequestMock().write() === undefined)
