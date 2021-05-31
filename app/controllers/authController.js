const express = require("express")
const middlewares = require("../middlewares")
const authService = require("../services/authService")

var apiRouter = express.Router()

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *    description: This api for user to login
 *    responses:
 *      200:
 *        description: Return "Login successfully"
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: hasan.ikhtiarta@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: hasan123
 */
apiRouter.post("/login", authService.login)

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *    description: This api for user to register
 *    responses:
 *      200:
 *        description: Return "User successfully registered"
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: hasan.ikhtiarta@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: hasan123
 *               name:
 *                 type: string
 *                 description: The user's full name
 *                 example: hasan ikhtiarta
 */
apiRouter.post("/register", [middlewares.isValidEmail], authService.register)
/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *    description: This api for user to logout
 *    responses:
 *      200:
 *        description: Return "User logout successfully"
 */
apiRouter.post("/logout", authService.logout)

module.exports = apiRouter
