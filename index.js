module.exports = {

  Backend: require('./src/backend/Backend'),
  RestApi: require('./src/backend/api/RestApi'),
  Index: require('./src/backend/method/Index'),
  Method: require('./src/backend/method/Method'),
  NotFoundMethod: require('./src/backend/method/NotFoundMethod'),
  RequestBody: require('./src/backend/request/RequestBody'),
  ServingFiles: require('./src/backend/static/ServingFiles'),
  CachedServingFiles: require('./src/backend/static/CachedServingFiles')

}
