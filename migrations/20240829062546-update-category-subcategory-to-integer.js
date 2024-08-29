"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("BusinessProfiles", "category", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Categories",
        key: "id",
      },
    });
    await queryInterface.changeColumn("BusinessProfiles", "subcategory", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Subcategories",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("BusinessProfiles", "category", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("BusinessProfiles", "subcategory", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
