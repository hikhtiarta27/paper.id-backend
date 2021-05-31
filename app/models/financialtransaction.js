'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinancialTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FinancialTransaction.belongsTo(models.FinancialAccount, {
        foreignKey: 'financialAccountId'
      })
    }
  };
  FinancialTransaction.init({
    name: DataTypes.STRING,
    financialAccountId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FinancialTransaction',
    timestamps: true,
    paranoid: true,  
    deletedAt: 'deletedAt'  
  });
  return FinancialTransaction;
};