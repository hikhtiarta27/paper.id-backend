const db = require("../../models")
const supertest = require("supertest")
const faker = require("faker")
const app = require("../../../app")
const userRepository = require("../../repository/userRepository")

describe("testing user api", () => {
  let email = "user-test1@gmail.com"
  let password = "user-test1"
  let name = "user-test1"  
  let token

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
  })

  test("get profile should be success", async (done) => {
    const response = await supertest(app)
      .get(`/api/user/${email}`)
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send()
      .expect(200)

    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  test("user update should be success", async (done) => {    
    const response = await supertest(app)
      .put(`/api/user/${email}`)
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({ name })
      .expect(200)

    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  test("user update should be failed : user not found", async (done) => {    
    let email = "user-test-notfound@gmail.com"
    const response = await supertest(app)
      .put(`/api/user/${email}`)
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send({ name })
      .expect(401)

    expect(response.body).toMatchObject({
      error: true,
    })
    done()
  })

  test("user delete should be success", async (done) => {    
    const response = await supertest(app)
      .delete(`/api/user/${email}`)
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send()
      .expect(200)

    expect(response.body).toMatchObject({
      error: false,
    })
    done()
  })

  test("user update should be failed : user not found", async (done) => {    
    email = "user-test-notfound@gmail.com"
    const response = await supertest(app)
    .delete(`/api/user/${email}`)
      .set("authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json")
      .send()
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
