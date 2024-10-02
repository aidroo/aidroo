"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new columns bylikes and byloves
    await queryInterface.addColumn("Reviews", "bylikes", {
      type: Sequelize.JSON,
      defaultValue: ["d"], // Default value is an array with a single empty string
    });

    await queryInterface.addColumn("Reviews", "byloves", {
      type: Sequelize.JSON,
      defaultValue: ["d"], // Default value is an array with a single empty string
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the columns if we need to revert the migration
    await queryInterface.removeColumn("Reviews", "bylikes");
    await queryInterface.removeColumn("Reviews", "byloves");
  },
};
