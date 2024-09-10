"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("BusinessProfiles", "username", {
      type: Sequelize.STRING(255),
      allowNull: false,
      references: {
        model: "Users", // Name of the referenced table
        key: "username",
      },
      onDelete: "CASCADE", // Add cascade on delete
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert to the previous state if needed
    await queryInterface.changeColumn("BusinessProfiles", "username", {
      type: Sequelize.STRING(255),
      allowNull: false,
      references: {
        model: "Users",
        key: "username",
      },
      onDelete: null, // Remove cascade on delete
    });
  },
};
