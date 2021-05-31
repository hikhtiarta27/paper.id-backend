'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FinancialTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      financialAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "FinancialAccounts",
          key: "id",
          as: "financialAccountId",
        },
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      deletedAt: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FinancialTransactions');
  }
};