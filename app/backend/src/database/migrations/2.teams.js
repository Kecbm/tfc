'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const teamsTable = await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return teamsTable;
  },

  async down(queryInterface, Sequelize) {
    const deleteTeamsTable = queryInterface.dropTable('teams');

    return deleteTeamsTable;
  }
};