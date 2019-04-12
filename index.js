module.exports = {

  Backend: require('./src/backend/Backend'),
  RestApi: require('./src/backend/api/RestApi'),
  IndexEndpoint: require('./src/backend/endpoint/IndexEndpoint'),
  InternalServerErrorEndpoint: require('./src/backend/endpoint/InternalServerErrorEndpoint'),
  Endpoint: require('./src/backend/endpoint/Endpoint'),
  NotFoundEndpoint: require('./src/backend/endpoint/NotFoundEndpoint'),
  RequestBody: require('./src/backend/request/RequestBody'),
  ServingFilesEndpoint: require('./src/backend/static/ServingFilesEndpoint'),
  CachedServingFilesEndpoint: require('./src/backend/static/CachedServingFilesEndpoint')

}
