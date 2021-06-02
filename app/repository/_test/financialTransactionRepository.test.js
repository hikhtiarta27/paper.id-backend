const app = require("../../../app")
const db = require("../../models")
const financialAccountRepository = require("../financialAccountRepository")
const financialTransactionRepository = require("../financialTransactionRepository")
const userRepository = require("../userRepository")

describe("UserRepository", () => {
  let email = "tes123@tes.com"
  let password = "tes123@tes.com"
  let name = "tes"
  let userId
  let financialAccountId

  beforeAll(async () => {
    await db.sequelize.sync({
      force: true,
    })
    await userRepository.add({ email, name, password })
    userId = 1
    let param = {
      userId,
      name: "Cash",
      type: "Cash",
      description: "Cash flow",
    }
    await financialAccountRepository.add(param)
    financialAccountId = 1
  })

  test("add repo should be success : financial transaction created", async (done) => {
    let param = {
      userId,
      financialAccountId,
      name: "Hasan",
      amount: 10000,
      description: "Food",
    }
    await financialTransactionRepository.add(param)
    financialTransactionRepository.getByUserIdAndId(userId, 1).then((val) => {
      expect(val).not.toBeNull()
      done()
    })
  })

  test("get by user id and id repo should be success", async (done) => {
    financialTransactionRepository.getByUserIdAndId(userId, 1).then((val) => {
      expect(val).not.toBeNull()
      done()
    })
  })

  test("get by user id repo should be success", async (done) => {
    financialTransactionRepository.getByUserId(userId).then((val) => {
      expect(val.length).toEqual(1)
      done()
    })
  })

  test("get summary daily repo should be success", async (done) => {
    financialTransactionRepository.getSummaryAmountByUserId(userId, {daily: new Date().getMonth() + 1}).then((val) => {
      expect(val.length).toEqual(1)
      done()
    })
  })

  test("get summary monthly repo should be success", async (done) => {
    financialTransactionRepository.getSummaryAmountByUserId(userId, {monthly: new Date().getFullYear()}).then((val) => {
      expect(val.length).toEqual(1)
      done()
    })
  })

  test("update repo should be failed : financial transaction not found", async (done) => {
    let param = {
      userId,
      financialAccountId,
      name: "Hasan",
      amount: 10000,
      description: "Food",
    }
    financialTransactionRepository.update(param, 2).then((val) => {
      expect(val[0]).toEqual(0)
      done()
    })
  })

  test("update repo should be success : financial transaction updated", async (done) => {
    let param = {
      userId,
      financialAccountId,
      name: "Hasan",
      amount: 10000,
      description: "Food",
    }
    financialTransactionRepository.update(param, 1).then((val) => {
      expect(val).not.toBeNull()
      done()
    })
  })

  test("delete repo should be failed : financial transaction not found", async (done) => {
    financialTransactionRepository.delete(2).then((val) => {
      expect(val).toEqual(0)
      done()
    })
  })

  test("delete repo should be success : financial transaction deleted", async (done) => {
    financialTransactionRepository.delete(1).then((val) => {
      expect(val).not.toBeNull()
      done()
    })
  })

  test("restore repo should be success : restore done", async (done) => {
    financialTransactionRepository.restore().then((val) => {
      expect(val).not.toBeNull()
      done()
    })
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
})
