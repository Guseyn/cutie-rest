module.exports = {

  Backend: require('./src/backend/Backend'),
  RestApi: require('./src/backend/api/RestApi'),
  Endpoint: require('./src/backend/endpoint/Endpoint'),
  IndexEndpoint: require('./src/backend/endpoint/IndexEndpoint'),
  InternalServerErrorEndpoint: require('./src/backend/endpoint/InternalServerErrorEndpoint'),
  NotFoundEndpoint: require('./src/backend/endpoint/NotFoundEndpoint'),
  CORSEndpoint: require('./src/backend/endpoint/CORSEndpoint'),
  RequestBody: require('./src/backend/request/RequestBody'),
  RequestParams: require('./src/backend/request/RequestParams'),
  RequestWithProgress: require('./src/backend/request/RequestWithProgress'),
  ServingFilesEndpoint: require('./src/backend/static/ServingFilesEndpoint'),
  CachedServingFilesEndpoint: require('./src/backend/static/CachedServingFilesEndpoint')

}
