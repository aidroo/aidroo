"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM(
        "personal",
        "business",
        "admin",
        "editor",
        "reviewer",
        "becreator"
      ),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert to previous state (if needed)
    await queryInterface.changeColumn("Users", "role", {
      type: Sequelize.ENUM("personal", "business", "admin"),
      allowNull: false,
    });
  },
};
