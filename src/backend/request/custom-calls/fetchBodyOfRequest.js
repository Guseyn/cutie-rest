'use strict'

function fetchBodyOfRequest (request, callback) {
  const body = []
  request.on('data', (chunk) => {
    body.push(chunk)
  })
  request.on('end', () => {
    request.body = Buffer.concat(body)
    callback(null, request.body)
  })
}

module.exports = fetchBodyOfRequest
