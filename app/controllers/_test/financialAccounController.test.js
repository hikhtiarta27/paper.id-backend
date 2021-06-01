const db = require("../../models")
const supertest = require("supertest")
const app = require("../../../app")
const userRepository = require("../../repository/userRepository")
const financialTransactionRepository = require("../../repository/financialTransactionRepository")

describe("financialAccountController", () => {
  let email = "user-test1@gmail.com"
  let password = "user-test1"
  let name = "user-test1"
  let token
  let userId

  beforeAll(async () => {
    await db.sequelize.sync({
      force: true,
    })
    await userRepository.add({ email, password, name })
    let response = await supertest(app)
      .post("/api/auth/login")
      .set("Content-Type", "application/json")
      .send({ email, password })
      .expect(200)
    token = response.body.result.token
    userId = response.body.result.userId
  })

  test("create financial account should be success", async (done) => {
    const response = await supertest(app)
      .post("/api/financialAccount")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId,
        accountName: "Cash",
        type: "Cash",
        description: "Cash flow",
      })
      .expect(200)
    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  test("create financial account should be failed : account name already registered", async (done) => {
    const response = await supertest(app)
      .post("/api/financialAccount")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId,
        accountName: "Cash",
        type: "Cash",
        description: "Cash flow",
      })
      .expect(401)
    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  })

  test("get all list financial account should be return one data", async (done) => {
    const response = await supertest(app)
      .post("/api/financialAccount/getAllListFinancialAccount?page=1")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({ userId })
      .expect(200)
    expect(response.body.result.length).toEqual(1)
    done()
  })

  test("update financial account should be success", async (done) => {
    const response = await supertest(app)
      .put("/api/financialAccount")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId,
        id: 1,
        accountName: "Cash",
        type: "Cash",
        description: "Cash flow",
      })
      .expect(200)
    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  test("update financial account should be failed : account not found", async (done) => {
    const response = await supertest(app)
      .put("/api/financialAccount")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId,
        id: 10,
        accountName: "Cash",
        type: "Cash",
        description: "Cash flow",
      })
      .expect(401)
    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  })

  test("delete financial account should be failed : account still in use", async (done) => {
    await financialTransactionRepository.add({
      financialAccountId: 1,
      financeName: "Hasan",
      amount: 10000,
      description: "Food",
    })

    const response = await supertest(app)
      .delete("/api/financialAccount")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId,
        id: 1,
      })
      .expect(401)
    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  })

  test("delete financial account should be success", async (done) => {
    await financialTransactionRepository.delete(1)

    const response = await supertest(app)
      .delete("/api/financialAccount")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId,
        id: 1,
      })
      .expect(200)
    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  test("delete financial account should be failed : account not found", async (done) => {
    const response = await supertest(app)
      .delete("/api/financialAccount")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
        userId,
        id: 10,
      })
      .expect(401)
    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  })

  test("restore financial account should be success", async (done) => {
    const response = await supertest(app)
      .post("/api/financialAccount/restore")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send()
      .expect(200)
    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
})
