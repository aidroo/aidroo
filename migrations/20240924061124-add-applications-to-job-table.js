"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add a new column 'applications' to the 'Job' table
    return queryInterface.addColumn("Jobs", "applications", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the 'applications' column
    return queryInterface.removeColumn("Jobs", "applications");
  },
};
