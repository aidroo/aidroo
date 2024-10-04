"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change profileId column type from INTEGER to STRING
    await queryInterface.changeColumn("Reactions", "profileId", {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "username",
      },
      onDelete: "CASCADE",
    });

    // Add createdBy column
    await queryInterface.addColumn("Reactions", "createdBy", {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "username",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert profileId column type to INTEGER
    await queryInterface.changeColumn("Reactions", "profileId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "username",
      },
      onDelete: "CASCADE",
    });

    // Remove createdBy column
    await queryInterface.removeColumn("Reactions", "createdBy");
  },
};
