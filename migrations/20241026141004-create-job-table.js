"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Jobs", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      profileUsername: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      currency: {
        type: Sequelize.ENUM("USD", "GBP", "EUR"),
        allowNull: false,
        defaultValue: "USD",
      },
      priceType: {
        type: Sequelize.ENUM("negotiable", "fixed"),
        allowNull: true,
        defaultValue: "negotiable",
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
      subcategory_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Subcategories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      startDate: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      endDate: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      images: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("approved", "pending"),
        defaultValue: "pending",
      },
      applications: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Jobs"); // Remove the Jobs table if migration is reverted
  },
};
