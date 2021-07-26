'use strict'

const { Assertion } = require('@cuties/assert')
const { IsUndefined } = require('@cuties/is')
const KilledProcessOnPortIfExists = require('./../../../src/backend/cluster/KilledProcessOnPortIfExists')
const LoggedListeningServer = require('./../../../src/backend/server/LoggedListeningServer')
const ServerMock = require('./../../../mock/ServerMock')

new LoggedListeningServer(
  new ServerMock(), 'server log'
).after(
  new Assertion(
    new IsUndefined(
      new KilledProcessOnPortIfExists(8080)
    )
  )
).call()
