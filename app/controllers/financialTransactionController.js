const express = require("express")
const financialTransactionService = require("../services/financialTransactionService")
const authService = require("../services/authService")

var financialTransactionRouter = express.Router()

/**
 * @openapi
 * /api/financialTransaction/getAllListFinancialTransaction:
 *   post:
 *     description: API to get all financial transaction with a user already logged. This API using JWT for authorization
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
 *         name: finance_name
 *         required: false
 *         description: Filtering by finance name
 *         example: hasan
 *         schema:
 *           type: string
 *       - in: query
 *         name: finance_account
 *         required: false
 *         description: Filtering by finance account name
 *         example: cash
 *         schema:
 *           type: string
 *       - in: query
 *         name: description
 *         required: false
 *         description: Filtering by description
 *         example: dog food
 *         schema:
 *           type: string
 *       - in: query
 *         name: start_date
 *         required: false
 *         description: Filtering by start date
 *         example: 2021-05-31
 *         schema:
 *           type: string
 *       - in: query
 *         name: end_date
 *         required: false
 *         description: Filtering by end date
 *         example: 2021-05-31
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
 *                 description: User's id from JWT payload
 *                 example: 1
 *     responses:
 *       200:
 *         description: Get financial transaction by user id
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
 *     description: API to create a new financial transaction with a user already logged. This API using JWT for authorization
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
 *                 description: User's id from JWT payload
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
 *         description: Financial transaction successfully created
 *       401:
 *         description: Financial account {id} not found
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
 *     description: API to update an existing financial transaction with a user already logged. This API using JWT for authorization
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
 *                 description: User's id from JWT payload
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
 *         description: Financial transaction successfully updated
 *       401:
 *         description: Financial account {id} not found || Financial transaction {id} not found
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
 *     description: API to delete an existing financial transaction with a user already logged. This API using JWT for authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: Integer
 *                 description: User's id from JWT payload
 *                 example: 1
 *               id:
 *                 type: Integer
 *                 description: Financial transaction id
 *                 example: 1
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Financial transaction successfully deleted
 *       401:
 *         description: Financial transaction {id} not found
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
 *     description: API to generate summary daily transactions. This API using JWT for authorization
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         description: Financial transaction in a month
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
 *                 description: User's id from JWT payload
 *                 example: 1
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Get summary daily financial transaction
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
 *     description: API to generate summary monthly transactions. This API using JWT for authorization
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         description: Financial transaction in a year
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
 *                 description: User's id from JWT payload
 *                 example: 1
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Get monthly financial transaction summary
 */
financialTransactionRouter.post(
  "/summary/monthly",
  [authService.tokenVerify],
  financialTransactionService.getFinancialTransactionMonthly
)

/**
 * @openapi
 * /api/financialTransaction/restore:
 *   post:
 *     description: API to restore all financial transaction. This API using JWT for authorization
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Financial transaction has been restored
 */
 financialTransactionRouter.post(
  "/restore",
  [authService.tokenVerify],
  financialTransactionService.restoreAll
)

module.exports = financialTransactionRouter
