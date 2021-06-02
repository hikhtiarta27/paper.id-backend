const authController = require("../controllers/authController")
const userController = require("../controllers/userController")
const financialAccountController = require("../controllers/financialAccountController")
const financialTransactionController = require("../controllers/financialTransactionController")

module.exports = function (app) {
  app.use("/api/auth", authController)
  app.use("/api/user", userController)
  app.use("/api/financialAccount", financialAccountController)
  app.use("/api/financialTransaction", financialTransactionController)
}
