const express = require("express")
const middlewares = require("../middlewares")
const authService = require("../services/authService")

var apiRouter = express.Router()

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *    description: API for user to login to system
 *    responses:
 *      200:
 *        description: Login successfully 
 *      401:
 *        description: User not found || Password didn't match
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: hasan.ikhtiarta@gmail.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: hasan123
 */
apiRouter.post("/login", authService.login)

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *    description: API for register new user to system
 *    responses:
 *      200:
 *        description: User successfully registered
 *      401:
 *        description: User already registered
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: hasan.ikhtiarta@gmail.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: hasan123
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: hasan ikhtiarta
 */
apiRouter.post("/register", [middlewares.isValidEmail], authService.register)
/**
 * @openapi
 * /api/auth/logout:
 *   delete:
 *     description: API for logout from system
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
 *         description: Logout succesfully
 */
apiRouter.post("/logout", authService.logout)

module.exports = apiRouter
