const express = require("express")
const userService = require("../services/userService")
const authService = require("../services/authService")

var userRouter = express.Router()

/**
 * @openapi
 * /api/user/{email}:
 *   get:
 *     description: API to get use profile. This API using JWT for authorization
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User's email
 *         schema:
 *           type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Get user successfully
 *       401:
 *         description: User not found
 */
userRouter.get("/:email", [authService.tokenVerify], userService.getUserProfile)

/**
 * @openapi
 * /api/user/{email}:
 *   put:
 *     description: API to update an existing user. This API using JWT for authorization
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User's email
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *                 example: hasan ikhtiarta
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Update user successfully
 *       401:
 *         description: User not found
 */
userRouter.put("/:email", [authService.tokenVerify], userService.updateUser)

/**
 * @openapi
 * /api/user/{email}:
 *   delete:
 *     description: API to delete an existing user. This API using JWT for authorization
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The user's email 
 *         schema:
 *           type: string
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Delete user successfully
 *       401:
 *         description: User not found
 */
userRouter.delete("/:email", [authService.tokenVerify], userService.deleteUser)

module.exports = userRouter