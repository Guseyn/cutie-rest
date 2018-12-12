module.exports = {

  Backend: require('./src/backend/Backend'),
  RestApi: require('./src/backend/api/RestApi'),
  IndexMethod: require('./src/backend/method/IndexMethod'),
  InternalServerErrorMethod: require('./src/backend/method/InternalServerErrorMethod'),
  Method: require('./src/backend/method/Method'),
  NotFoundMethod: require('./src/backend/method/NotFoundMethod'),
  RequestBody: require('./src/backend/request/RequestBody'),
  CreatedServingFilesMethod: require('./src/backend/static/CreatedServingFilesMethod'),
  CreatedCachedServingFilesMethod: require('./src/backend/static/CreatedCachedServingFilesMethod'),
  ServingFilesMethod: require('./src/backend/static/ServingFilesMethod'),
  CachedServingFilesMethod: require('./src/backend/static/CachedServingFilesMethod')

}
