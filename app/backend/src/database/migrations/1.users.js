'use strict';

module.exports = {
  async up(queryInterface, Sequelize){
    const usersTable = await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });

    return usersTable;
  },

  async down(queryInterface, Sequelize) {
    const deleteUsersTable = await queryInterface.dropTable('users');

    return deleteUsersTable;
  }
};