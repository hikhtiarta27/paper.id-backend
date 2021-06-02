const { isEmail } = require("../helper")
const {loggerInfo, loggerError} = require("../log")

function isValidEmail(req, res, next) {
  if (!isEmail(req.body.email)) {
    loggerError(req, "email:" + req.body.email + " FAILED EMAIL NOT VALID")    
    res.status(401).send({
      error: true,
      message: "Email not valid",
      result: null
    })
  } else next()
}

module.exports = {
  isValidEmail,
}
