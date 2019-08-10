'use strict'

function progressRequest (request, response, totalLengthHeaderName, callback) {
  const body = []
  const totalLengthHeaderValue = request.headers[totalLengthHeaderName] * 1
  let progress = 0
  request.on('data', (chunk) => {
    body.push(chunk)
    progress += Buffer.byteLength(chunk)
    response.write(`${progress / totalLengthHeaderValue * 100}%\n`)
  })
  request.on('end', () => {
    request.body = Buffer.concat(body)
    callback(null, request)
  })
}

module.exports = progressRequest
