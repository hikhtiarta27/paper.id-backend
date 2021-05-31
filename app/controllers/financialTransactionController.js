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
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: Financial transaction paging {limit 10 item}
 *         example: 1
 *         schema:
 *           type: integer
 *       - in: query
 *         name: type
 *         required: false
 *         description: Financial transaction type filtering
 *         schema:
 *           type: string
 *       - in: query
 *         name: start_date
 *         required: false
 *         description: Financial transaction start_date filtering
 *         schema:
 *           type: string
 *       - in: query
 *         name: end_date
 *         required: false
 *         description: Financial transaction end_date filtering
 *         schema:
 *           type: string
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
 *                 description: Financial account id
 *                 example: 1
 *               financeName:
 *                 type: String
 *                 description: Financial transaction name
 *                 example: Hasan
 *               amount:
 *                 type: Integer
 *                 description: Financial transaction amount
 *                 example: 10000
 *               description:
 *                 type: String
 *                 description: Financial transaction description
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
 *                 description: Financial transaction id
 *                 example: 1
 *               userId:
 *                 type: Integer
 *                 description: The user's id
 *                 example: 1
 *               financeAccountId:
 *                 type: Integer
 *                 description: Financial account id
 *                 example: 1
 *               financeName:
 *                 type: String
 *                 description: Financial transaction name
 *                 example: Hasan
 *               amount:
 *                 type: Integer
 *                 description: Financial transaction amount
 *                 example: 10000
 *               description:
 *                 type: String
 *                 description: Financial transaction description
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

/**
 * @openapi
 * /api/financialTransaction/summary/daily:
 *   post:
 *     description: this API for generating summary daily transaction
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         description: Financial transaction month
 *         example: 5
 *         schema:
 *           type: integer
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
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Return "Get summary daily financial transaction"
 */
 financialTransactionRouter.post(
  "/summary/daily",
  [authService.tokenVerify],
  financialTransactionService.getFinancialTransactionDaily
)

/**
 * @openapi
 * /api/financialTransaction/summary/monthly:
 *   post:
 *     description: this API for generating monthly transaction summary
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         description: Financial transaction year
 *         example: 2021
 *         schema:
 *           type: integer
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
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Return "Get monthly financial transaction summary"
 */
 financialTransactionRouter.post(
  "/summary/monthly",
  [authService.tokenVerify],
  financialTransactionService.getFinancialTransactionMonthly
)


module.exports = financialTransactionRouter
