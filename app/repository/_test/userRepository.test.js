const app = require("../../../app")
const db = require("../../models")
const userRepository = require("../userRepository")

describe("userRepository", () => {
  beforeAll(async () => {
    await db.sequelize.sync({
      force: true,
    })
  })

  test("get repo should be failed : user not found", async (done) => {
    let email = "testing-email@email.com"
    userRepository.get(email).then((val) => {
      expect(val).toBeNull()
    })
    done()
  })

  test("get repo should be success : user exist", async (done) => {
    let param = {
      email: "tes123@tes.com",
      password: "tes123@tes.com",
      name: "tes",
      address: "test",
      phoneNumber: "081297991631",
    }
    await userRepository.add(param)
    userRepository.get(param.email).then((val) => {
      expect(val).not.toBeNull()
    })
    done()
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
})
