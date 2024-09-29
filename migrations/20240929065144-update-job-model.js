"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Jobs", "price", {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0, // Changed the default value to 0
    });

    await queryInterface.changeColumn("Jobs", "startDate", {
      type: Sequelize.STRING(255),
      allowNull: true, // Changed type from DATEONLY to STRING
    });

    await queryInterface.changeColumn("Jobs", "endDate", {
      type: Sequelize.STRING(255),
      allowNull: true, // Changed type from DATEONLY to STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Jobs", "price", {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null, // Revert back to previous state if necessary
    });

    await queryInterface.changeColumn("Jobs", "startDate", {
      type: Sequelize.DATEONLY,
      allowNull: true, // Revert back to DATEONLY
    });

    await queryInterface.changeColumn("Jobs", "endDate", {
      type: Sequelize.DATEONLY,
      allowNull: true, // Revert back to DATEONLY
    });
  },
};
