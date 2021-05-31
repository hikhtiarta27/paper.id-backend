var fs = require("fs")

let logInfoPath =
  process.env.NODE_ENV === "test"
    ? "./app/log/test/logInfo.test.txt"
    : "./app/log/logInfo.txt"
let logErrorPath = 
  process.env.NODE_ENV === "test"
    ? "./app/log/test/logError.test.txt"
    : "./app/log/logError.txt"
let logDebugPath = 
  process.env.NODE_ENV === "test"
    ? "./app/log/test/logDebug.test.txt"
    : "./app/log/logDebug.txt"

function info() {
  var date = new Date()
  var logData =
    req.originalUrl +
    " " +
    req.method +
    " " +
    req.ip +
    " " +
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString() +
    "\n"
  fs.appendFile(logInfoPath, logData, () => {})
}

/**
 *
 * @param {Object} req
 * @param {String} message
 */
function error(req, message) {
  var date = new Date()
  var logData =
    req.originalUrl +
    " " +
    req.method +
    " " +
    req.ip +
    " " +
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString() +
    " " +
    message +
    "\n"
  fs.appendFile(logErrorPath, logData, () => {})
}

/**
 *
 * @param {Object} req
 * @param {String} message
 */
function debug(req, message) {
  var date = new Date()
  var logData = 
    "[" +
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString() +
    "] " +
    req.originalUrl +
    " " +
    req.method +
    " " +
    req.ip +
    " " +
    message +
    "\n"
  fs.appendFile(logDebugPath, logData, () => {})
}

module.exports = {
  info,
  error,
  debug,
}
