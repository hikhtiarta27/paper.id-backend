const financialTransactionRepository = require("../repository/financialTransactionRepository")
const financialAccountRepository = require("../repository/financialAccountRepository")

const { dateToString, currencyFormatter } = require("../helper")
const Logger = require("../log")

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
          Logger.debug(
            req,
            `USER_ID: ${userId} FAILED CREATE NEW FINANCE TRANSACTION FINANCE ACCOUNT ID NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Financial account ID not found`,
            result: null,
          })
        } else {
          financialTransactionRepository
            .add({ financialAccountId, name, amount, description })
            .then(() => {
              Logger.debug(
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
  },

  getFinancialTransactionByUserId(req, res) {
    let options = {
      type: req.query.type != null ? req.query.type : null,
      start_date: req.query.start_date != null ? req.query.start_date : null,
      end_date: req.query.end_date != null ? req.query.end_date : null,
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
              financeAccount: val[i].FinancialAccount.name,
              amount: {
                raw: val[i].amount,
                format: `Rp ${currencyFormatter(val[i].amount)}.00`,
              },
              description: val[i].description,
              transactionDate: dateToString(val[i].createdAt),
              updatedAt: dateToString(val[i].updatedAt),
            }
            listOfFinancialTransaction.push(obj)
          }
        }
        Logger.debug(
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
      .catch((err) => {
        res.status(500).send(err.message)
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
          Logger.debug(
            req,
            `USER_ID: ${userId} FAILED UPDATE FINANCE ACCOUNT ID NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Financial account with id ${financialAccountId} not found`,
            result: null,
          })
        } else {
          financialTransactionRepository.getByUserIdAndId(userId, id)
          .then(val=>{
            if(val == null){
              Logger.debug(
                req,
                `USER_ID: ${userId} FAILED UPDATE FINANCE TRANSACTION ID NOT FOUND`
              )
              res.status(401).send({
                error: true,
                message: `Financial transaction with id ${id} not found`,
                result: null,
              })
            }else{
              financialTransactionRepository
              .update({ financialAccountId, name, amount, description }, id)
              .then(() => {
                Logger.debug(
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
  },

  deleteFinancialTransactionByUserIdAndId(req, res) {
    let userId = req.body.userId
    let id = req.body.id
    financialTransactionRepository
      .getByUserIdAndId(userId, id)
      .then((val) => {
        if (val == null) {
          Logger.debug(
            req,
            `USER_ID: ${userId} FAILED DELETE FINANCE TRANSACTION NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Financial transaction with id: ${id} not found`,
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
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  getFinancialTransactionDaily(req, res){    
    let daily = req.query.month
    financialTransactionRepository
      .getSummaryAmountByUserId(req.body.userId, {daily})
      .then((val) => {        
        let listSummary = []
        if(val != null) {
          for (let i = 0; i < val.length; i++) {
            const e = val[i];                        
            let obj = {
              date: e.date,
              totalAmount: e.totalAmount
            } 
            listSummary.push(obj)
          }
        }

        Logger.debug(
          req,
          "USER_ID:" +
            req.body.userId +
            " SUCCESS GET SUMMARY DAILY FINANCE TRANSACTION BY USER ID"
        )
        res.status(200).send({
          error: false,
          message: "Get summary daily financial transaction",
          result: val,
        })
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  getFinancialTransactionMonthly(req, res){    
    let monthly = req.query.year
    financialTransactionRepository
      .getSummaryAmountByUserId(req.body.userId, {monthly})
      .then((val) => {                
        let listSummary = []
        if(val != null) {
          for (let i = 0; i < val.length; i++) {
            const e = val[0];                        
            let tmp = new Date(e.date)
            let obj = {
              date: `${tmp.getFullYear()}-${tmp.getMonth()}`,
              totalAmount: e.totalAmount
            } 
            listSummary.push(obj)
          }
        }

        Logger.debug(
          req,
          "USER_ID:" +
            req.body.userId +
            " SUCCESS GET SUMMARY MONTHLY FINANCE TRANSACTION BY USER ID"
        )
        res.status(200).send({
          error: false,
          message: "Get summary monthly financial transaction",
          result: val,
        })
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  }
}
