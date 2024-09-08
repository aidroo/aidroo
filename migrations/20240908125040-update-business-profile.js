"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("BusinessProfiles", "id", {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    });

    // Other column additions or changes can be done here
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("BusinessProfiles", "id");

    // Other rollback operations can be done here
  },
};
