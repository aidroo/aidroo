"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Reviews", "like", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [], // Set default to an empty array
    });

    await queryInterface.changeColumn("Reviews", "love", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [], // Set default to an empty array
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert changes if necessary
    await queryInterface.changeColumn("Reviews", "like", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Set default back to 0
    });

    await queryInterface.changeColumn("Reviews", "love", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0, // Set default back to 0
    });
  },
};
