const express = require("express")
const financialAccountService = require("../services/financialAccountService")
const authService = require("../services/authService")

var financialAccountRouter = express.Router()

/**
 * @openapi
 * /api/financialAccount/getAllListFinancialAccount:
 *   post:
 *     description: API for get all financial account with a user already logged. This API using JWT for authorization
 *     security:
 *	     - jwt: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: Financial account paging {limit 10 item}
 *         example: 1
 *         schema:
 *           type: integer
 *       - in: query
 *         name: type
 *         required: false
 *         description: Filtering by type
 *         example: bank
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
 *         description: Get financial account by user id
 */
financialAccountRouter.post(
  "/getAllListFinancialAccount",
  [authService.tokenVerify],
  financialAccountService.getFinancialAccountByUserId
)

/**
 * @openapi
 * /api/financialAccount:
 *   post:
 *     description: API to create a new financial account with a user already logged. This API using JWT for authorization
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
 *               accountName:
 *                 type: String
 *                 description: Financial account name
 *                 example: Cash
 *               type:
 *                 type: String
 *                 description: Financial account type
 *                 example: Cash
 *               description:
 *                 type: String
 *                 description: Financial account description
 *                 example: Cash flow
 *     responses:
 *       200:
 *         description: Financial account {name} successfully created
 *       401:
 *         description: Financial account {name} already registered
 */
financialAccountRouter.post(
  "/",
  [authService.tokenVerify],
  financialAccountService.createFinancialAccount
)

/**
 * @openapi
 * /api/financialAccount:
 *   put:
 *     description: API to update an existing financial account with a user already logged. This API using JWT for authorization
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
 *                 description: Financial account id
 *                 example: 1
 *               accountName:
 *                 type: String
 *                 description: Financial account name
 *                 example: Cash
 *               type:
 *                 type: String
 *                 description: Financial account type
 *                 example: Cash
 *               description:
 *                 type: String
 *                 description: Financial account description
 *                 example: Cash flow
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Financial account successfully updated
 *       401:
 *         description: Financial account {id} not found
 */
financialAccountRouter.put(
  "/",
  [authService.tokenVerify],
  financialAccountService.updateFinancialAccountByUserIdAndId
)

/**
 * @openapi
 * /api/financialAccount:
 *   delete:
 *     description: API to delete an existing financial account with a user already logged. This API using JWT for authorization
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
 *                 description: Financial account id
 *                 example: 1
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Financial account successfully deleted
 *       401:
 *         description: Financial account {id} not found || Financial account {id} still in use
 */
financialAccountRouter.delete(
  "/",
  [authService.tokenVerify],
  financialAccountService.deleteFinancialAccountByUserIdAndId
)

/**
 * @openapi
 * /api/financialAccount/restore:
 *   post:
 *     description: API to restore all financial account. This API using JWT for authorization
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Financial account has been restored
 */
 financialAccountRouter.post(
  "/restore",
  [authService.tokenVerify],
  financialAccountService.restoreAll
)

module.exports = financialAccountRouter
