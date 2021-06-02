const financialTransactionRepository = require("../repository/financialTransactionRepository")
const financialAccountRepository = require("../repository/financialAccountRepository")

const { dateToString, currencyFormatter } = require("../helper")
const {loggerInfo, loggerError} = require("../log")

module.exports = {
  createFinancialTransaction(req, res) {
    let financialAccountId = req.body.financeAccountId
    let name = req.body.financeName
    let amount = req.body.amount
    let description = req.body.description
    let userId = req.body.userId

    financialAccountRepository
      .getByUserIdAndId(userId, financialAccountId)
      .then((val) => {
        if (val == null) {
          loggerError(
            req,
            `USER_ID: ${userId} FAILED CREATE NEW FINANCE TRANSACTION FINANCE ACCOUNT ID NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Financial account ${financialAccountId} not found`,
            result: null,
          })
        } else {
          financialTransactionRepository
            .add({ financialAccountId, name, amount, description })
            .then(() => {
              loggerInfo(
                req,
                `USER_ID: ${userId} SUCCESS CREATE NEW FINANCE TRANSACTION`
              )
              res.status(200).send({
                error: false,
                message: `Financial transaction successfully created`,
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

  getFinancialTransactionByUserId(req, res) {
    let options = {
      financeName:
        req.query.finance_name != null ? req.query.finance_name : null,
      financeAccount:
        req.query.finance_account != null ? req.query.finance_account : null,
      description: req.query.description != null ? req.query.description : null,
      startDate: req.query.start_date != null ? req.query.start_date : null,
      endDate: req.query.end_date != null ? req.query.end_date : null,
      page: req.query.page != null ? req.query.page : 1,
    }
    financialTransactionRepository
      .getByUserId(req.body.userId, options)
      .then((val) => {
        let listOfFinancialTransaction = []
        if (val != null) {
          for (let i = 0; i < val.length; i++) {
            let obj = {
              id: val[i].id,
              financeName: val[i].name,
              financeAccountName: val[i].FinancialAccount.name,
              amount: {
                raw: val[i].amount,
                format: `Rp ${currencyFormatter(val[i].amount)}.00`,
              },
              description: val[i].description,
              transactionDate: dateToString(val[i].createdAt),
              // updatedAt: dateToString(val[i].updatedAt),
            }
            listOfFinancialTransaction.push(obj)
          }
        }
        loggerInfo(
          req,
          "USER_ID:" +
            req.body.userId +
            " SUCCESS GET FINANCE TRANSACTION BY USER ID"
        )
        res.status(200).send({
          error: false,
          message: "Get financial transaction by user id",
          result: listOfFinancialTransaction,
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

  updateFinancialTransaction(req, res) {
    let financialAccountId = req.body.financeAccountId
    let name = req.body.financeName
    let amount = req.body.amount
    let description = req.body.description
    let userId = req.body.userId
    let id = req.body.id

    financialAccountRepository
      .getByUserIdAndId(userId, financialAccountId)
      .then((val) => {
        if (val == null) {
          loggerError(
            req,
            `USER_ID: ${userId} FAILED UPDATE FINANCE ACCOUNT ID NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Financial account with id ${financialAccountId} not found`,
            result: null,
          })
        } else {
          financialTransactionRepository
            .getByUserIdAndId(userId, id)
            .then((val) => {
              if (val == null) {
                loggerError(
                  req,
                  `USER_ID: ${userId} FAILED UPDATE FINANCE TRANSACTION ID NOT FOUND`
                )
                res.status(401).send({
                  error: true,
                  message: `Financial transaction with id ${id} not found`,
                  result: null,
                })
              } else {
                financialTransactionRepository
                  .update({ financialAccountId, name, amount, description }, id)
                  .then(() => {
                    loggerInfo(
                      req,
                      `USER_ID: ${userId} SUCCESS UPDATE FINANCE TRANSACTION`
                    )
                    res.status(200).send({
                      error: false,
                      message: `Financial transaction successfully updated`,
                      result: null,
                    })
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

  deleteFinancialTransactionByUserIdAndId(req, res) {
    let userId = req.body.userId
    let id = req.body.id
    financialTransactionRepository
      .getByUserIdAndId(userId, id)
      .then((val) => {
        if (val == null) {
          loggerError(
            req,
            `USER_ID: ${userId} FAILED DELETE FINANCE TRANSACTION NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Financial transaction ${id} not found`,
            result: null,
          })
        } else {
          financialTransactionRepository.delete(id).then(() => {
            res.status(200).send({
              error: false,
              message: "Financial transaction successfully deleted",
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

  getFinancialTransactionDaily(req, res) {
    let daily = req.query.month
    financialTransactionRepository
      .getSummaryAmountByUserId(req.body.userId, { daily })
      .then((val) => {
        let listSummary = []
        if (val != null) {
          for (let i = 0; i < val.length; i++) {
            const e = val[i].dataValues
            let obj = {
              date: e.date,
              totalAmount: {
                raw: parseInt(e.totalAmount),
                format: `Rp ${currencyFormatter(e.totalAmount)}.00`,
              },
            }
            listSummary.push(obj)
          }
        }

        loggerInfo(
          req,
          "USER_ID:" +
            req.body.userId +
            " SUCCESS GET SUMMARY DAILY FINANCE TRANSACTION BY USER ID"
        )
        res.status(200).send({
          error: false,
          message: "Get summary daily financial transaction",
          result: listSummary,
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

  getFinancialTransactionMonthly(req, res) {
    let monthly = req.query.year
    financialTransactionRepository
      .getSummaryAmountByUserId(req.body.userId, { monthly })
      .then((val) => {
        let listSummary = []
        if (val != null) {
          for (let i = 0; i < val.length; i++) {
            const e = val[i].dataValues
            let obj = {
              date: `${e.year}-${e.month < 10 ? `0${e.month}` : e.month}`,
              totalAmount: {
                raw: parseInt(e.totalAmount),
                format: `Rp ${currencyFormatter(e.totalAmount)}.00`,
              },
            }
            listSummary.push(obj)
          }
        }

        loggerInfo(
          req,
          "USER_ID:" +
            req.body.userId +
            " SUCCESS GET SUMMARY MONTHLY FINANCE TRANSACTION BY USER ID"
        )
        res.status(200).send({
          error: false,
          message: "Get summary monthly financial transaction",
          result: listSummary,
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

  restoreAll(req, res){
    financialTransactionRepository.restore()
    .then(val=>{
      res.status(200).send({
        error: false,
        message: "Financial transaction has been restored",
        result: null
      })
    })
  }
}
