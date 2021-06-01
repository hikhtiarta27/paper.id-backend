const db = require("../../models")
const supertest = require("supertest")
const app = require("../../../app")

describe("testing auth api", () => {
  let email = "user-test@gmail.com"
  let password = "user-test"
  let name = "user-test"  

  beforeAll(async () => {
    await db.sequelize.sync({
      force: true
    })
  })

  test("register should be success", async (done) => {
    const response = await supertest(app)
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .send({ email, password, name })
      .expect(200)

    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  test("register should be failed : email not valid", async (done) => {
    let email = "user-test@gmail"

    const response = await supertest(app)
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .send({ email, password, name })
      .expect(401)

    expect(response.body).toMatchObject({
      error: true,
    })

    done()
  })

  test("register should be failed : user already registered", async (done) => {
    const response = await supertest(app)
      .post("/api/auth/register")
      .set("Content-Type", "application/json")
      .send({ email, password, name })
      .expect(401)

    expect(response.body).toMatchObject({
      error: true,
    })

    done()
  })

  test("login should be success", async (done) => {
    const response = await supertest(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({ email, password })
      .expect(200)

    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  test("login should be failed : user not found", async (done) => {
    let email = "user-test1@gmail.com"    

    const response = await supertest(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({ email, password })
      .expect(401)

    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  })

  test("login should be failed : password didn't match", async (done) => {    
    let password = "user-test1"

    const response = await supertest(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({ email, password })
      .expect(401)

    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
})
