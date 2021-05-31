const FinancialTransaction = require("../models").FinancialTransaction
const FinancialAccount = require("../models").FinancialAccount
const Sequelize = require("sequelize")

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
  getByUserId(userId, options = null) {
    let obj = {}

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
    } else {
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
      include: [
        {
          model: FinancialAccount,
          where: { userId },
          attibutes: ["name"],
        },
      ],
    }

    let offset = options.page * 10

    queryOptions["limit"] = 10
    queryOptions["offset"] = offset - 10
    // queryOptions['order'] = [["createdAt", "ASC"]]

    return FinancialTransaction.findAll(queryOptions)
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
  getByFinanceAccountId(financialAccountId) {
    return FinancialTransaction.findOne({
      where: {
        financialAccountId,
      },
    })
  },

  /**
   *
   * @param {Integer} userId
   * @returns
   */
  getSummaryAmountByUserId(userId, options = null) {
    let obj = {}
    let attributesField = null
    let groupField = null

    if (options.daily != null) {
      let today = new Date()
      // let todayStr = `${today.getFullYear()}-${
      //   today.getMonth() + 1
      // }-${today.getDate()}`
      // let lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      // let lastWeekStr = `${lastWeek.getFullYear()}-${
      //   lastWeek.getMonth() + 1
      // }-${lastWeek.getDate()}`
      // obj = {
      //   [Sequelize.Op.and]: [
      //     Sequelize.where(
      //       Sequelize.fn(
      //         "date",
      //         Sequelize.col("FinancialTransaction.createdAt")
      //       ),
      //       ">=",
      //       lastWeekStr
      //     ),
      //     Sequelize.where(
      //       Sequelize.fn(
      //         "date",
      //         Sequelize.col("FinancialTransaction.createdAt")
      //       ),
      //       "<=",
      //       todayStr
      //     ),
      //   ],
      // }

      obj = {
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "month",
              Sequelize.col("FinancialTransaction.createdAt")
            ),
            "=",
            options.daily
          ),
          Sequelize.where(
            Sequelize.fn(
              "year",
              Sequelize.col("FinancialTransaction.createdAt")
            ),
            "=",
            today.getFullYear()
          ),
        ]
      }

      attributesField = [        
        [Sequelize.fn("DATE", Sequelize.col("FinancialTransaction.createdAt")), "date"],        
        [Sequelize.fn("sum", Sequelize.col("amount")), "totalAmount"],
      ]

      groupField = [
        Sequelize.fn("DATE", Sequelize.col("FinancialTransaction.createdAt")),
        // "FinancialAccount.id",
      ]
    }    

    if (options.monthly != null) {            
      obj = {
        createdAt: Sequelize.where(
          Sequelize.fn(
            "year",
            Sequelize.col("FinancialTransaction.createdAt")
          ),
          "=",
          options.monthly
        ),
      }
      

      attributesField = [        
        [Sequelize.fn("month", Sequelize.col("FinancialTransaction.createdAt")), "month"],
        [Sequelize.fn("year", Sequelize.col("FinancialTransaction.createdAt")), "year"],
        [Sequelize.fn("sum", Sequelize.col("amount")), "totalAmount"],
      ]

      groupField = [
        Sequelize.fn("month", Sequelize.col("FinancialTransaction.createdAt")),
        Sequelize.fn("year", Sequelize.col("FinancialTransaction.createdAt")),
        // "FinancialAccount.id",
      ]
    }

    let queryOptions = {
      where: obj,
      attributes: attributesField,
      include: [
        {
          model: FinancialAccount,
          where: { userId },    
          attributes: []                
        },
      ],
      group: groupField,      
    }

    return FinancialTransaction.findAll(queryOptions)
  },
}
