const jwt = require("jsonwebtoken")
let secret = "TAS-TAS-TAS"
const { comparePassword } = require("../helper")
const {loggerInfo, loggerError} = require("../log")
const userRepository = require("../repository/userRepository")

module.exports = {
  login(req, res) {
    let email = req.body.email
    let password = req.body.password
    userRepository
      .get(email)
      .then((val) => {
        if (val == null) {
          loggerError(req, `EMAIL:${email} FAILED USER NOT FOUND`)
          res.status(401).send({
            error: true,
            message: "User not found",
            result: null,
          })
        } else {
          comparePassword(password, val.password).then((result) => {
            if (!result) {
              loggerError(req, `EMAIL:${email} FAILED PASSWORD DIDN't MATCH`)
              res.status(401).send({
                error: true,
                message: "Password didn't match",
                result: null,
              })
            } else {
              let token = jwt.sign({ email }, secret, { expiresIn: 86400 })
              loggerInfo(req, `EMAIL:${email} SUCCESS LOGIN`)              
              res.status(200).send({
                error: false,
                message: "Login successfully",
                result: {
                  email,
                  userId: val.id,
                  lastLogin: new Date().toLocaleString(),
                  token,
                },
              })
            }
          })
        }
      })
      .catch(() => {
        res.status(401).send({
          error: true,
          message: "Missing parameter",
          result: null,
        })
      })
  },

  register(req, res) {
    let email = req.body.email
    userRepository
      .get(email)
      .then((val) => {
        if (val != null) {
          loggerError(req, `EMAIL: ${email} FAILED USER ALREADY REGISTERED`)
          res.status(401).send({
            error: true,
            message: "User already registered",
            result: null,
          })
        } else {
          userRepository
            .add(req.body)
            .then(() => {
              loggerInfo(req, `EMAIL: ${email} SUCCESS REGISTERED`)
              res.status(200).send({
                error: false,
                message: "User successfully registered",
                result: null,
              })
            })
            .catch(() => {
              res.status(401).send({
                error: true,
                message: "Missing parameter",
                result: null,
              })
            })
        }
      })
      .catch(() => {
        res.status(401).send({
          error: true,
          message: "Missing parameter",
          result: null,
        })
      })
  },

  tokenVerify(req, res, next) {
    let email = req.body.email
    let token = req.headers.authorization
    if (token == null) {
      res.status(401).send({
        error: true,
        message: "Authorization header is missing",
        result: null,
      })
    }
    if (token.split(" ")[0] != "Bearer" || token.split(" ")[1] == null) {
      loggerError(req, `EMAIL: ${email} FAILED TOKEN NOT FOUND`)
      res.status(401).send({
        error: true,
        message: "Token must be provided",
        result: null,
      })
    }
    jwt.verify(token.split(" ")[1], secret, (err, val) => {
      if (err) {
        loggerError(req, `EMAIL: ${email} FAILED ${err.message}`)
        res.status(401).send({
          error: true,
          message: err.message,
          result: null,
        })
      } else next()
    })
  },

  logout(req, res) {
    loggerInfo(req, `USER_ID: ${req.body.userId} SUCCESS USER LOGOUT`)
    res.status(200).send({
      error: false,
      message: "Logout successfully",
      result: null,
    })
  },
}
