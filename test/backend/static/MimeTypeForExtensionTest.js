'use strict'

const { StrictEqualAssertion } = require('@cuties/assert')
const MimeTypeForExtension = require('./../../../src/backend/static/MimeTypeForExtension')

new StrictEqualAssertion(
  new MimeTypeForExtension('file.*'), 'application/octet-stream'
).call()

new StrictEqualAssertion(
  new MimeTypeForExtension('file'), 'text/plain'
).call()
