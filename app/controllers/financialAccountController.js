const express = require("express")
const financialAccountService = require("../services/financialAccountService")
const authService = require("../services/authService")

var financialAccountRouter = express.Router()

/**
 * @openapi
 * /api/financialAccount/getAllListFinancialAccount:
 *   post:
 *     description: this API for get all financial account with a user already logged
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
 *         description: Return "Financial account with name {name} successfully created"
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
 *     description: this API for creating a financial account with a user already logged
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
 *         description: Return "Financial account with name {name} successfully created"
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
 *     description: this API for updating a financial account with a user already logged
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
 *         description: Return "Financial account successfully updated"
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
 *     description: this API for deleting a financial account with a user already logged
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
 *                 description: Financial account id
 *                 example: 1
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Return "Financial account successfully deleted"
 */
financialAccountRouter.delete(
  "/",
  [authService.tokenVerify],
  financialAccountService.deleteFinancialAccountByUserIdAndId
)

module.exports = financialAccountRouter
