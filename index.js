module.exports = {

  Backend: require('./src/backend/Backend'),
  RestApi: require('./src/backend/api/RestApi'),
  Method: require('./src/backend/method/Method'),
  ServingFiles: require('./src/backend/static/ServingFiles'),
  CachedServingFiles: require('./src/backend/static/CachedServingFiles')

}
