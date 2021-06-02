const financialAccountRepository = require("../repository/financialAccountRepository")
const financialTransactionRepository = require("../repository/financialTransactionRepository")

const { dateToString } = require("../helper")
const {loggerInfo, loggerError} = require("../log")

module.exports = {
  createFinancialAccount(req, res) {
    let userId = req.body.userId
    let name = req.body.accountName
    let type = req.body.type
    let description = req.body.description

    financialAccountRepository
      .getByUserIdAndName(userId, name)
      .then((val) => {
        if (val != null) {
          loggerError(
            req,
            `USER_ID: ${userId} FAILED CREATE NEW FINANCE ACCOUNT ALREADY REGISTERED`
          )
          res.status(401).send({
            error: true,
            message: `Financial account ${name} already registered`,
            result: null,
          })
        } else {
          financialAccountRepository
            .add({ userId, name, type, description })
            .then(() => {
              loggerInfo(
                req,
                `USER_ID: ${userId} SUCCESS CREATE NEW FINANCE ACCOUNT`
              )
              res.status(200).send({
                error: false,
                message: `Financial account ${name} successfully created`,
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

  getFinancialAccountByUserId(req, res) {
    let options = {
      type: req.query.type != null ? req.query.type : null,
      startDate: req.query.start_date != null ? req.query.start_date : null,
      endDate: req.query.end_date != null ? req.query.end_date : null,
      page: req.query.page != null ? req.query.page : 1,
    }
    financialAccountRepository
      .getByUserId(req.body.userId, options)
      .then((val) => {        
        let listOfFinancialAccount = []
        if (val != null) {
          for (let i = 0; i < val.length; i++) {
            let obj = {
              id: val[i].id,
              accountName: val[i].name,
              type: val[i].type,
              description: val[i].description,
              createdAt: dateToString(val[i].createdAt),
              updatedAt: dateToString(val[i].updatedAt),
            }
            listOfFinancialAccount.push(obj)
          }
        }
        loggerInfo(
          req,
          "USER_ID:" +
            req.body.userId +
            " SUCCESS GET FINANCE ACCOUNT BY USER ID"
        )
        res.status(200).send({
          error: false,
          message: "Get financial account by user id",
          result: listOfFinancialAccount,
        })
      })
      .catch(() => {
        res.status(401).send({
          error: true,
          message: "Missing parameter",
          result: null,
        })
      })
  },

  updateFinancialAccountByUserIdAndId(req, res) {
    let userId = req.body.userId
    let id = req.body.id
    let name = req.body.accountName
    let type = req.body.type
    let description = req.body.description
    financialAccountRepository
      .getByUserIdAndId(userId, id)
      .then((val) => {
        if (val == null) {
          loggerError(
            req,
            `USER_ID: ${userId} FAILED UPDATE FINANCE ACCOUNT NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Financial account ${id} not found`,
            result: null,
          })
        } else {
          financialAccountRepository
            .update({ name, type, description }, id)
            .then(() => {
              loggerInfo(
                req,
                `USER_ID: ${userId} SUCCESS UPDATE FINANCE ACCOUNT`
              )
              res.status(200).send({
                error: false,
                message: "Financial account successfully updated",
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

  deleteFinancialAccountByUserIdAndId(req, res) {
    let userId = req.body.userId
    let id = req.body.id
    financialAccountRepository
      .getByUserIdAndId(userId, id)
      .then((val) => {
        if (val == null) {
          loggerError(
            req,
            `USER_ID: ${userId} FAILED DELETE FINANCE ACCOUNT NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Financial account ${id} not found`,
            result: null,
          })
        } else {
          financialTransactionRepository.getByFinanceAccountId(id)
          .then(val=>{
            if(val != null){
              loggerError(
                req,
                `USER_ID: ${userId} FAILED FINANCE ACCOUNT STILL IN USE`
              )
              res.status(401).send({
                error: true,
                message: `Financial account ${id} still in use`,
                result: null,
              })
            }else{
              financialAccountRepository.delete(id).then(() => {
                loggerInfo(
                  req,
                  `USER_ID: ${userId} SUCCESS DELETE FINANCE ACCOUNT`
                )
                res.status(200).send({
                  error: false,
                  message: "Financial account successfully deleted",
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

  restoreAll(req, res){
    financialAccountRepository.restore()
    .then(val=>{
      res.status(200).send({
        error: false,
        message: "Financial account has been restored",
        result: null
      })
    })
  }
}
