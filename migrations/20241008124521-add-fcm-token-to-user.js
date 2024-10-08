"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "fcmToken", {
      type: Sequelize.STRING,
      allowNull: true, // Users may not have an FCM token at first
    });

    await queryInterface.addColumn("Users", "fcmTokenExpire", {
      type: Sequelize.DATE,
      allowNull: true, // This is optional, depends on how you handle token expiration
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "fcmToken");
    await queryInterface.removeColumn("Users", "fcmTokenExpire");
  },
};
