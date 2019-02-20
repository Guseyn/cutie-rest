module.exports = (ms, callback) => {
  setTimeout(() => {
    callback(ms)
  }, ms)
}
