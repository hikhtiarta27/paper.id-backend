const app = require("./app")
const PORT = process.env.PORT || 3010
const db = require("./app/models")

//force: true drop table if exist
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started in: " + PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
