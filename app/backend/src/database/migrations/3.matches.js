'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const matchesTable = await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      home_team: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "teams",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      away_team: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "teams",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    });

    return matchesTable;
  },

  async down(queryInterface, Sequelize) {
    const deleteMatchesTable = queryInterface.dropTable('matches');

    return deleteMatchesTable;
  }
};