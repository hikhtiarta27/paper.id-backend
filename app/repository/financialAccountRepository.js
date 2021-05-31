const FinancialAccount = require("../models").FinancialAccount

module.exports = {
  // /**
  //  *
  //  * @param {Integer} id
  //  * @returns
  //  */
  // get(id) {
  //   return FinancialAccount.findOne({
  //     where: { id },
  //   })
  // },

  /**
   *
   * @param {Object} param
   * @returns
   */
  add(param) {
    return FinancialAccount.create(param)
  },

  /**
   *
   * @param {Object} param
   * @param {Integer} id
   * @returns
   */
  update(param, id) {
    return FinancialAccount.update(param, {
      where: {
        id,
      },
    })
  },

  /**
   *
   * @param {Integer} id
   * @returns
   */
  delete(id) {
    return FinancialAccount.destroy({
      where: {
        id,
      },
    })
  },

  /**
   *
   * @param {Integer} userId
   * @param {String} name
   * @returns
   */
  getByUserIdAndName(userId, name) {
    return FinancialAccount.findOne({
      where: { userId, name },
    })
  },

  /**
   * 
   * @param {Integer} userId 
   * @returns 
   */
  getByUserId(userId) {
    return FinancialAccount.findAll({
      where: { userId },
    })
  },

  /**
   * 
   * @param {Integer} userId 
   * @param {Integer} id 
   * @returns 
   */
  getByUserIdAndId(userId, id){
    return FinancialAccount.findOne({
      where: { userId, id },
    })
  }
}
