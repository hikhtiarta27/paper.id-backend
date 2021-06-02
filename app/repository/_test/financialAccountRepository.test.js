const app = require("../../../app")
const db = require("../../models")
const financialAccountRepository = require("../financialAccountRepository")
const userRepository = require("../userRepository")

describe("UserRepository", () => {

  let email = "tes123@tes.com"
  let password = "tes123@tes.com"
  let name =  "tes"
  let userId

  beforeAll(async () => {
    await db.sequelize.sync({
      force: true
    })
    await userRepository.add({email, name, password})
    userId = 1
  })

  test("add repo should be success : financial account created", async (done) => {
    let param = {
      userId,
      name: "Cash",
      type: "Cash",
      description: "Cash flow"
    }
    await financialAccountRepository.add(param)
    financialAccountRepository.getByUserIdAndId(userId, 1)
    .then(val=>{
      expect(val).not.toBeNull()
      done()
    })      
  })

  test("get by user id and id repo should be success", async (done) => {    
    financialAccountRepository.getByUserIdAndId(userId, 1)
    .then(val=>{      
      expect(val).not.toBeNull()
      done()
    })      
  })

  test("get by user id repo should be success", async (done) => {    
    financialAccountRepository.getByUserId(userId)
    .then(val=>{
      expect(val.length).toEqual(1)
      done()
    })      
  })

  test("get by user id and name repo should be success", async (done) => {    
    financialAccountRepository.getByUserIdAndName(userId, "Cash")
    .then(val=>{      
      expect(val.name).toEqual("Cash")
      done()
    })      
  })

  test("get by user id and name repo should be failed : {name} cash not found", async (done) => {    
    financialAccountRepository.getByUserIdAndName(userId, "Bank")
    .then(val=>{
      expect(val).toBeNull()
      done()
    })      
  })

  test("update repo should be failed : financial account not found", async (done) => {    
    let param = {
      userId,
      name: "cash",
      type: "Cash",
      description: "Cash flow"
    }
    financialAccountRepository.update(param, 2).then((val) => {      
      expect(val[0]).toEqual(0)
      done()
    })    
  })

  test("update repo should be success : financial account updated", async (done) => {
    let param = {
      userId,
      name: "cash",
      type: "Cash",
      description: "Cash flow"
    }
    financialAccountRepository.update(param, 1).then((val) => {
      expect(val).not.toBeNull()
      done()
    })          
  })

  test("delete repo should be failed : financial account not found", async (done) => {    
    financialAccountRepository.delete(2).then((val) => {
      expect(val).toEqual(0)
      done()
    })    
  })

  test("delete repo should be success : financial account deleted", async (done) => {
    financialAccountRepository.delete(1).then((val) => {
      expect(val).not.toBeNull()
      done()
    })      
  })

  test("restore repo should be success : restore done", async (done) => {
    financialAccountRepository.restore().then((val) => {
      expect(val).not.toBeNull()
      done()
    })      
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
})
