import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const Review = sequelize.define(
  "Review",
  {
    username: {
      type: DataTypes.STRING(255), // Explicitly set length for username
      references: {
        model: "Users",
        key: "username",
      },
      allowNull: false,
    },
    profileId: {
      type: DataTypes.STRING(255), // Explicitly set length for username
      references: {
        model: "Users",
        key: "username",
      },
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT, // More efficient for storing small integers (1-5)
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(2000), // Long titles allowed
      allowNull: true, // Explicitly allow null
    },
    comment: {
      type: DataTypes.TEXT, // Long comments allowed
      allowNull: true, // Explicitly allow null
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    love: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    images: {
      type: DataTypes.JSON, // Allows storing an array or object of images
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Review;
