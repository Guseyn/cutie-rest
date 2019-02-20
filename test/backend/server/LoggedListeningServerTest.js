'use strict'

const { Assertion } = require('@cuties/assert')
const { Is } = require('@cuties/is')
const LoggedListeningServer = require('./../../../src/backend/server/LoggedListeningServer')
const ServerMock = require('./../../../mock/ServerMock')

new Assertion(
  new Is(
    new LoggedListeningServer(
      new ServerMock(), 'server log'
    ), ServerMock
  )
).call()
