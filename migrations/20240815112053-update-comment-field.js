// migrations/20240815000000-create-business-profiles.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BusinessProfiles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      businessName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileThumb: {
        type: Sequelize.STRING(2048), // Adjust length as necessary
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT, // Use TEXT for large text
        allowNull: true,
      },
      businessType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subcategory: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("approved", "pending", "deleted"),
        defaultValue: "pending",
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        validate: {
          isFloat: {
            args: true,
            msg: "Rating must be a floating-point number.",
          },
          min: {
            args: [0],
            msg: "Rating must be at least 0.",
          },
          max: {
            args: [5],
            msg: "Rating must be at most 5.",
          },
        },
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      top: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      guaranteed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      claimed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Optional: Add indexes if needed
    await queryInterface.addIndex("BusinessProfiles", ["username"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("BusinessProfiles");
  },
};
