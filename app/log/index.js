const winston = require('winston');
 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),  
  transports: [    
    new winston.transports.File({ filename: process.env.NODE_ENV == 'test' ? './app/log/error.test.log' : './app/log/error.log', level: 'error' }),
    new winston.transports.File({ filename: process.env.NODE_ENV == 'test' ? './app/log/info.test.log' : './app/log/info.log' }),
  ],
});
 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

/**
 *
 * @param {Object} req
 * @param {String} message
 */
function loggerInfo(req, message){
  logger.log({
    level: 'info',
    message: `${req.ip} [${new Date().toUTCString()}] ${req.method} ${req.originalUrl} | ${message}`
  })
}

/**
 *
 * @param {Object} req
 * @param {String} message
 */
function loggerError(req, message){
  logger.log({
    level: 'error',
    message: `${req.ip} [${new Date().toUTCString()}] ${req.method} ${req.originalUrl} | ${message}`
  })
}

module.exports = {
  loggerInfo,
  loggerError
}
