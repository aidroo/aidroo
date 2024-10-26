"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Conversations", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      senderUser: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references: {
          model: "Users", // The table name
          key: "username", // The column in Users table
        },
        onUpdate: "CASCADE", // What happens when a referenced record is updated
        onDelete: "CASCADE", // What happens when a referenced record is deleted
      },
      receiverUser: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references: {
          model: "Users",
          key: "username",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"), // Automatically set to the current date/time
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"), // Automatically set to the current date/time
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Conversations");
  },
};
