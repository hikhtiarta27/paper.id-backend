const financialAccountRepository = require("../repository/financialAccountRepository")
const financialTransactionRepository = require("../repository/financialTransactionRepository")

const { dateToString } = require("../helper")
const Logger = require("../log")

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
          Logger.debug(
            req,
            `USER_ID: ${userId} FAILED CREATE NEW FINANCE ACCOUNT ALREADY REGISTERED`
          )
          res.status(401).send({
            error: true,
            message: `Finance account with name: ${name} already registered`,
            result: null,
          })
        } else {
          financialAccountRepository
            .add({ userId, name, type, description })
            .then(() => {
              Logger.debug(
                req,
                `USER_ID: ${userId} SUCCESS CREATE NEW FINANCE ACCOUNT`
              )
              res.status(200).send({
                error: false,
                message: `Finance account with name: ${name} successfully created`,
                result: null,
              })
            })
        }
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  getFinancialAccountByUserId(req, res) {
    financialAccountRepository
      .getByUserId(req.body.userId)
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
        Logger.debug(
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
      .catch((err) => {
        res.status(500).send(err.message)
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
          Logger.debug(
            req,
            `USER_ID: ${userId} FAILED UPDATE FINANCE ACCOUNT NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Finance account with id: ${id} not found`,
            result: null,
          })
        } else {
          financialAccountRepository
            .update({ name, type, description }, id)
            .then(() => {
              Logger.debug(
                req,
                `USER_ID: ${userId} SUCCESS UPDATE FINANCE ACCOUNT`
              )
              res.status(200).send({
                error: false,
                message: "Finance account successfully updated",
                result: null,
              })
            })
        }
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },

  deleteFinancialAccountByUserIdAndId(req, res) {
    let userId = req.body.userId
    let id = req.body.id
    financialAccountRepository
      .getByUserIdAndId(userId, id)
      .then((val) => {
        if (val == null) {
          Logger.debug(
            req,
            `USER_ID: ${userId} FAILED DELETE FINANCE ACCOUNT NOT FOUND`
          )
          res.status(401).send({
            error: true,
            message: `Finance account with id: ${id} not found`,
            result: null,
          })
        } else {
          financialTransactionRepository.getByFinanceAccountId(id)
          .then(val=>{
            if(val != null){
              Logger.debug(
                req,
                `USER_ID: ${userId} FAILED FINANCE ACCOUNT STILL IN USE`
              )
              res.status(401).send({
                error: true,
                message: `Finance account with id: ${id} still in use`,
                result: null,
              })
            }else{
              financialAccountRepository.delete(id).then(() => {
                Logger.debug(
                  req,
                  `USER_ID: ${userId} SUCCESS DELETE FINANCE ACCOUNT`
                )
                res.status(200).send({
                  error: false,
                  message: "Finance account successfully deleted",
                  result: null,
                })
              })
            }
          })
          .catch(err=>{
          
          })          
        }
      })
      .catch((err) => {
        res.status(500).send(err.message)
      })
  },
}
