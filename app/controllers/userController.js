const express = require("express")
const userService = require("../services/userService")
const authService = require("../services/authService")

var userRouter = express.Router()

/**
 * @openapi
 * /api/user/{email}:
 *   get:
 *     description: This api for getting user profile
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
 *         description: Return "Get user successfully"
 */
userRouter.get("/:email", [authService.tokenVerify], userService.getUserProfile)

/**
 * @openapi
 * /api/user/{email}:
 *   put:
 *     description: This api for updating user profile
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The user's email 
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
 *                 description: The user's full name
 *                 example: hasan ikhtiarta
 *     security:
 *	     - jwt: []
 *     responses:
 *       200:
 *         description: Return "Update user successfully"
 */
userRouter.put("/:email", [authService.tokenVerify], userService.updateUser)

/**
 * @openapi
 * /api/user/{email}:
 *   delete:
 *     description: This api for deleting user
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
 *         description: Return "Delete user successfully"
 */
userRouter.delete("/:email", [authService.tokenVerify], userService.deleteUser)

module.exports = userRouter