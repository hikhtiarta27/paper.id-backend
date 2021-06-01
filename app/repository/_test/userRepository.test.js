const app = require("../../../app")
const db = require("../../models")
const userRepository = require("../userRepository")

describe("UserRepository", () => {
  beforeAll(async () => {
    await db.sequelize.sync({
      force: true
    })
  })

  test("get repo should be failed : user not found", async (done) => {
    let email = "testing-email@email.com"
    userRepository.get(email).then((val) => {
      expect(val).toBeNull()
    })
    done()
  })

  test("get repo should be success : user created", async (done) => {
    let param = {
      email: "tes123@tes.com",
      password: "tes123@tes.com",
      name: "tes",      
    }
    userRepository.add(param)
    .then(()=>{
      userRepository.get(param.email).then((val) => {
        expect(val).not.toBeNull()
        done()
      })      
    })        
  })

  test("update repo should be failed : user not found", async (done) => {
    let email = "testing-email@email.com"
    userRepository.update(email).then((val) => {      
      expect(val[0]).toEqual(0)
      done()
    })    
  })

  test("update repo should be success : user updated", async (done) => {
    let param = {
      email: "hasan@tes.com",
      password: "hasan@tes.com",
      name: "tes1",      
    }
    userRepository.add(param).then(()=>{
      userRepository.update(param, param.email).then((val) => {
        expect(val).not.toBeNull()
        done()
      })      
    })    
  })

  test("delete repo should be failed : user not found", async (done) => {
    let email = "testing-email@email.com"
    userRepository.delete(email).then((val) => {
      expect(val).toEqual(0)
      done()
    })    
  })

  test("delete repo should be success : user deleted", async (done) => {
    let param = {
      email: "tes1@tes.com",
      password: "1@tes.com",
      name: "tes1",      
    }
    userRepository.add(param)        
    .then(()=>{
      userRepository.delete(param.email).then((val) => {
        expect(val).not.toBeNull()
        done()
      })  
    })    
  })

  afterAll(async () => {
    await db.sequelize.close()
  })
})
