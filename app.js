require("dotenv").config()
const express = require("express")
const app = express()
const swaggerUi = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")

app.use([
  express.json(),
  express.urlencoded({
    extended: true,
  }),
])

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Paper.id backend documentation",
      version: "1.0.0",
    },    
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
  },  
  apis: ["./app/controllers/*.js"],
  swagger: "2.0",
}

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerOptions))
)

require("./app/router")(app)

module.exports = app
