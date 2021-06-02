const userRepository = require("../repository/userRepository")
const { stringToPhoneNumber, dateToString } = require("../helper")
const {loggerInfo, loggerError} = require("../log")

module.exports = {
  getUserProfile(req, res) {
    userRepository
      .get(req.params.email)
      .then((val) => {        
        if (val != null) {
          let obj = {
            id: val.id,
            name: val.name,
            email: val.email,            
            createdAt: dateToString(val.createdAt),
            updatedAt: dateToString(val.updatedAt),
          }
          loggerInfo(req, "email:" + req.params.email + " SUCCESS GET USER")
          res.status(200).send({
            error: false,
            message: "Get user profile",
            result: obj,
          })
        }else{
          loggerError(req, "email:" + req.params.email + " FAILED GET USER NOT FOUND")
          res.status(200).send({
            error: true,
            message: "User not found",
            result: null,
          })
        }
        
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  updateUser(req, res) {
    userRepository
      .get(req.params.email)
      .then((val) => {
        if (val == null) {
          loggerError(
            req,
            "email:" + req.params.email + " FAILED USER NOT FOUND"
          )
          res.status(401).send({
            error: true,
            message: "User not found",
            result: null,
          })
        } else {
          userRepository
            .update(req.body, req.params.email)
            .then((val) => {
              loggerInfo(
                req,
                "email:" + req.params.email + " SUCCESS UPDATE USER"
              )              
              res.status(200).send({
                error: false,
                message: "Update user successfully",
                result: null
              })
            })
            .catch((err) => {
              res.status(500).send(err.message)
            })
        }
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  deleteUser(req, res) {
    userRepository
      .get(req.params.email)
      .then((val) => {
        if (val == null) {
          loggerError(
            req,
            "email:" + req.params.email + " FAILED USER NOT FOUND"
          )
          res.status(401).send({
            error: true,
            message: "User not found",
            result: null,
          })
        } else {
          userRepository
            .delete(req.params.email)
            .then((val) => {
              loggerInfo(
                req,
                "email:" + req.params.email + " SUCCESS DELETE USER"
              )              
              res.status(200).send({
                error: false,
                message: "Delete user successfully",
                result: null
              })
            })
            .catch((err) => {
              res.status(500).send(err.message)
            })
        }
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },
}
