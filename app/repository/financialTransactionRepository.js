const FinancialTransaction = require("../models").FinancialTransaction
const FinancialAccount = require("../models").FinancialAccount

module.exports = {
  // /**
  //  *
  //  * @param {Integer} id
  //  * @returns
  //  */
  // get(id) {
  //   return FinancialTransaction.findOne({
  //     where: { id },
  //   })
  // },

  /**
   *
   * @param {Object} param
   * @returns
   */
  add(param) {
    return FinancialTransaction.create(param)
  },

  /**
   *
   * @param {Object} param
   * @param {Integer} id
   * @returns
   */
  update(param, id) {
    return FinancialTransaction.update(param, {
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
    return FinancialTransaction.destroy({
      where: {
        id,
      },
    })
  },

  /**
   *
   * @param {Integer} userId
   * @returns
   */
  getByUserId(userId) {
    return FinancialTransaction.findAll({
      include: [
        {
          model: FinancialAccount,
          where: { userId },
          attibutes: ["name"],
        },
      ],
    })
  },

  /**
   * 
   * @param {Integer} userId 
   * @param {Integer} id 
   * @returns 
   */
  getByUserIdAndId(userId, id) {
    return FinancialTransaction.findOne({
      where: {
        id,
      },
      include: [
        {
          model: FinancialAccount,
          where: { userId },
        },
      ],
    })
  },

  /**
   * 
   * @param {Integer} financialAccountId 
   * @returns 
   */
  getByFinanceAccountId(financialAccountId){
    return FinancialTransaction.findOne({
      where: {
        financialAccountId,
      }
    })
  }
}
