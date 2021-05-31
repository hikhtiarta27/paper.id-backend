const express = require("express")
const financialTransactionService = require("../services/financialTransactionService")
const authService = require("../services/authService")

var financialTransactionRouter = express.Router()

/**
 * @openapi
 * /api/financialTransaction/getAllListFinancialTransaction:
 *   post:
 *     description: this API for get all financial transaction with a user already logged
 *     security:
 *	     - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: Integer
 *                 description: The user's id
 *                 example: 1
 *     responses:
 *       200:
 *         description: Return "Get financial transaction by user id"
 */
financialTransactionRouter.post(
  "/getAllListFinancialTransaction",
  [authService.tokenVerify],
  financialTransactionService.getFinancialTransactionByUserId
)

/**
 * @openapi
 * /api/financialTransaction:
 *   post:
 *     description: this API for creating new financial transaction with a user already logged
 *     security:
 *	     - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: Integer
 *                 description: The user's id
 *                 example: 1
 *               financeAccountId:
 *                 type: Integer
 *                 description: Finance account id
 *                 example: 1
 *               financeName:
 *                 type: String
 *                 description: Finance transaction name
 *                 example: Hasan
 *               amount:
 *                 type: Integer
 *                 description: Finance transaction amount
 *                 example: 10000
 *               description:
 *                 type: String
 *                 description: Finance transaction description
 *                 example: Food
 *     responses:
 *       200:
 *         description: Return "Financial transaction successfully created"
 */
financialTransactionRouter.post(
  "/",
  [authService.tokenVerify],
  financialTransactionService.createFinancialTransaction
)

/**
 * @openapi
 * /api/financialTransaction:
 *   put:
 *     description: this API for updating financial transaction with a user already logged
 *     security:
 *	     - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: Integer
 *                 description: Finance transaction id
 *                 example: 1
 *               userId:
 *                 type: Integer
 *                 description: The user's id
 *                 example: 1
 *               financeAccountId:
 *                 type: Integer
 *                 description: Finance account id
 *                 example: 1
 *               financeName:
 *                 type: String
 *                 description: Finance transaction name
 *                 example: Hasan
 *               amount:
 *                 type: Integer
 *                 description: Finance transaction amount
 *                 example: 10000
 *               description:
 *                 type: String
 *                 description: Finance transaction description
 *                 example: Food
 *     responses:
 *       200:
 *         description: Return "Financial transaction successfully updated"
 */
 financialTransactionRouter.put(
  "/",
  [authService.tokenVerify],
  financialTransactionService.updateFinancialTransaction
)

/**
 * @openapi
 * /api/financialTransaction:
 *   delete:
 *     description: this API for deleting a financial transaction with a user already logged
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: Integer
 *                 description: The user's id
 *                 example: 1
 *               id:
 *                 type: Integer
 *                 description: Financial transaction id
 *                 example: 1
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Return "Financial transaction successfully deleted"
 */
 financialTransactionRouter.delete(
  "/",
  [authService.tokenVerify],
  financialTransactionService.deleteFinancialTransactionByUserIdAndId
)


module.exports = financialTransactionRouter
