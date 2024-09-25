"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ReplyReviews", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Reviews", // Table name of the reviews
          key: "id",
        },
        onDelete: "CASCADE", // Automatically delete replies if the review is deleted
      },
      username: {
        type: Sequelize.STRING(255),
        allowNull: false,
        references: {
          model: "Users", // Table name of users
          key: "username",
        },
        onDelete: "CASCADE", // Automatically delete replies if the user is deleted
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      like: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      love: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ReplyReviews");
  },
};
