const FinancialTransaction = require("../models").FinancialTransaction
const FinancialAccount = require("../models").FinancialAccount
const Sequelize = require("sequelize")

module.exports = {
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
    let includeField = [
      {
        model: FinancialAccount,
        where: { userId },
        attibutes: ["name"],
      },
    ]

    if (options.type != null) {
      obj["type"] = {
        [Sequelize.Op.like]: `%${options.type}%`,
      }
    }

    if (options.financeName != null) {
      obj["name"] = {
        [Sequelize.Op.like]: `%${options.financeName}%`,
      }
    }

    if (options.financeAccount != null) {
      includeField = [
        {
          model: FinancialAccount,
          where: {
            userId,
            name: {
              [Sequelize.Op.like]: `%${options.financeAccount}%`,
            },
          },
          attibutes: ["name"],
        },
      ]
    }

    if (options.description != null) {
      obj["description"] = {
        [Sequelize.Op.like]: `%${options.description}%`,
      }
    }

    if (options.startDate != null && options.endDate != null) {
      let endDate = new Date(options.endDate)
      endDate.setDate(endDate.getDate() + 1)
      obj["createdAt"] = {
        [Sequelize.Op.gte]: new Date(options.startDate),
        [Sequelize.Op.lte]: endDate,
      }
    } else {
      if (options.startDate != null) {
        obj["createdAt"] = {
          [Sequelize.Op.gte]: new Date(options.startDate),
        }
      }
      if (options.endDate != null) {
        let endDate = new Date(options.endDate)
        endDate.setDate(endDate.getDate() + 1)
        obj["createdAt"] = {
          [Sequelize.Op.lte]: endDate,
        }
      }
    }

    let queryOptions = {
      where: obj,
      include: includeField,
      order: [["id", "DESC"]],
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
        ],
      }

      attributesField = [
        [
          Sequelize.fn("DATE", Sequelize.col("FinancialTransaction.createdAt")),
          "date",
        ],
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
          Sequelize.fn("year", Sequelize.col("FinancialTransaction.createdAt")),
          "=",
          options.monthly
        ),
      }

      attributesField = [
        [
          Sequelize.fn(
            "month",
            Sequelize.col("FinancialTransaction.createdAt")
          ),
          "month",
        ],
        [
          Sequelize.fn("year", Sequelize.col("FinancialTransaction.createdAt")),
          "year",
        ],
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
          attributes: [],
        },
      ],
      group: groupField,
    }

    return FinancialTransaction.findAll(queryOptions)
  },

/**
 * 
 * @returns 
 */
  restore(){
    return FinancialTransaction.restore()
  },
}
