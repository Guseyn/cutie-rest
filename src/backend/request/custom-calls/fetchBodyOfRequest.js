'use strict'

function fetchBodyOfRequest (request, callback) {
  let body = []
  request.on('data', (chunk) => {
    body.push(chunk)
  })
  request.on('end', () => {
    callback(null, Buffer.concat(body))
  })
}

module.exports = fetchBodyOfRequest
