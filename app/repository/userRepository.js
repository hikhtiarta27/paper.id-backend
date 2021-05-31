const User = require("../models").User
const { hashPassword } = require("../helper")

module.exports = {
  /**
   *
   * @param {String} email
   * @returns
   */
  get(email = "") {
    return User.findOne({
      where: { email },
    })
  },

  /**
   *
   * @param {Object} param
   * @returns
   */
  add(param) {
    return hashPassword(param.password).then((hash) => {
      param.password = hash
      return User.create(param)
    })
  },

  /**
   *
   * @param {Object} param
   * @param {String} email
   * @returns
   */
  update(param, email) {
    return User.update(param, {
      where: {
        email,
      },
    })
  },

  /**
   *
   * @param {String} email
   * @returns
   */
  delete(email) {
    return User.destroy({
      where: {
        email,
      },
    })
  },
}
