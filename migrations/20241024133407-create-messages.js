"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Messages", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      readStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      replyTo: {
        type: Sequelize.INTEGER,
        references: {
          model: "Messages", // Self-reference to the Messages table
          key: "id",
        },
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Messages");
  },
};
