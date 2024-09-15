"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("PersonalProfiles", "status", {
      type: Sequelize.ENUM("pending", "approved"), // Add ENUM type
      defaultValue: "pending",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("PersonalProfiles", "status");
  },
};
