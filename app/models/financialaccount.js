'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinancialAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FinancialAccount.hasMany(models.FinancialTransaction, {
        foreignKey: 'financialAccountId'
      })
      FinancialAccount.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  };
  FinancialAccount.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FinancialAccount',
    timestamps: true,
    paranoid: true,    
    deletedAt: 'deletedAt'
  });
  return FinancialAccount;
};