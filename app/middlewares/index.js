const { isEmail } = require("../helper")
const Logger = require("../log")

function isValidEmail(req, res, next) {
  if (!isEmail(req.body.email)) {
    Logger.debug(req, "email:" + req.body.email + " FAILED EMAIL NOT VALID")
    // _res.error = true
    // _res.message = "Email not valid!"
    // _res.result = null
    // res.status(401).send(_res)
  } else next()
}

module.exports = {
  isValidEmail,
}
