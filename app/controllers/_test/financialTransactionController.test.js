const db = require("../../models")
const supertest = require("supertest")
const app = require("../../../app")
const userRepository = require("../../repository/userRepository")
const financialAccountRepository = require("../../repository/financialAccountRepository")

describe("financialTransactionController", () => {   

  let email = "user-test1@gmail.com"
  let password = "user-test1"
  let name = "user-test1"  
  let token
  let userId

  beforeAll(async () => {
    await db.sequelize.sync({
      force: true,
    })
    await userRepository.add({ email, password, name})
    let response = await supertest(app)
      .post("/api/auth/login")      
      .set("Content-Type", "application/json")
      .send({ email, password })
      .expect(200)
    token = response.body.result.token
    userId = response.body.result.userId

    await financialAccountRepository.add({
      userId,
      accountName: "Cash",
      type: "Cash",
      description: "Cash flow",
    })
  })

  test("create financial transaction should be success", async (done) => {
    const response = await supertest(app)
      .post("/api/financialTransaction")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
          userId,
          financeAccountId: 1,
          financeName: "Hasan",
          amount: 10000,
          description: "Food"
        })
      .expect(200)
    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  }) 

  test("create financial transaction should be failed : financial account not found", async (done) => {
    const response = await supertest(app)
      .post("/api/financialTransaction")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
          userId,
          financeAccountId: 2,
          financeName: "Hasan",
          amount: 10000,
          description: "Food"
        })
      .expect(401)
    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  }) 

  test("get all list financial transaction should be success", async (done) => {
    const response = await supertest(app)
      .post("/api/financialTransaction/getAllListFinancialTransaction?page=1")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({          
          userId,
      })
      .expect(200)
    expect(response.body.result.length).toEqual(1)
    done()
  }) 

  test("update financial transaction should be success", async (done) => {
    const response = await supertest(app)
      .put("/api/financialTransaction")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
          id: 1,
          userId,
          financeAccountId: 1,
          financeName: "Hasan 2",
          amount: 10000,
          description: "Food"
        })
      .expect(200)
    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  }) 

  test("update financial transaction should be failed : financial account not found", async (done) => {
    const response = await supertest(app)
      .put("/api/financialTransaction")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
          userId,
          financeAccountId: 2,
          financeName: "Hasan",
          amount: 10000,
          description: "Food"
        })
      .expect(401)
    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  }) 

  test("update financial transaction should be failed : financial transaction not found", async (done) => {
    const response = await supertest(app)
      .put("/api/financialTransaction")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
          id: 3,
          userId,
          financeAccountId: 2,
          financeName: "Hasan",
          amount: 10000,
          description: "Food"
        })
      .expect(401)
    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  }) 

  test("delete financial transaction should be success", async (done) => {
    const response = await supertest(app)
      .delete("/api/financialTransaction")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({
          id: 1, 
          userId         
        })
      .expect(200)
    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  }) 

  test("delete financial transaction should be failed : financial transaction not found", async (done) => {
    const response = await supertest(app)
      .delete("/api/financialTransaction")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({id: 2, userId})
      .expect(401)
    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  }) 

  test("restore financial transaction should be success", async (done) => {
    const response = await supertest(app)
      .post("/api/financialTransaction/restore")
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send()
      .expect(200)
    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  test("get summary financial transaction daily should be success", async (done) => {
    const response = await supertest(app)
      .post("/api/financialTransaction/summary/daily?month=" + (new Date().getMonth() + 1))
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({userId})
      .expect(200)
    expect(response.body.result.length).toEqual(1)
    done()
  })

  test("get summary financial transaction monthly should be success", async (done) => {
    const response = await supertest(app)
      .post("/api/financialTransaction/summary/monthly?year=" + new Date().getFullYear())
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({userId})
      .expect(200)
    expect(response.body.result.length).toEqual(1)
    done()
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
})
