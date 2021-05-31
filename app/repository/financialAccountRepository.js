const FinancialAccount = require("../models").FinancialAccount
const Sequelize = require("sequelize")

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
  getByUserId(userId, options = null) {
    let obj = {
      userId,
    }

    if (options.type != null) {
      obj["type"] = {
        [Sequelize.Op.like]: `%${options.type}%`,
      }
    }

    if (options.start_date != null && options.end_date != null) {
      obj["createdAt"] = {
        [Sequelize.Op.gte]: new Date(options.start_date),
        [Sequelize.Op.lte]: new Date(options.end_date),
      }
    }else{
      if (options.start_date != null) {
        obj["createdAt"] = {
          [Sequelize.Op.gte]: new Date(options.start_date),
        }
      }
      if (options.end_date != null) {
        obj["createdAt"] = {
          [Sequelize.Op.lte]: new Date(options.end_date),
        }
      }
    }    

    let queryOptions = {
      where: obj,            
    }

    let offset = options.page * 10

    queryOptions['limit'] = 10
    queryOptions['offset'] = offset - 10
    // queryOptions['order'] = [["createdAt", "DESC"]]

    return FinancialAccount.findAll(queryOptions)
  },

  /**
   *
   * @param {Integer} userId
   * @param {Integer} id
   * @returns
   */
  getByUserIdAndId(userId, id) {
    return FinancialAccount.findOne({
      where: { userId, id },
    })
  },
}
