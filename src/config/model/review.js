import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      references: {
        model: "Users",
        key: "username",
      },
      allowNull: false,
    },
    profileId: {
      type: DataTypes.STRING(255),
      references: {
        model: "Users",
        key: "username",
      },
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    like: {
      type: DataTypes.JSON, // Array of usernames who liked the review
      defaultValue: [], // Default to an empty array
    },
    love: {
      type: DataTypes.JSON, // Array of usernames who loved the review
      defaultValue: [], // Default to an empty array
    },
    bylikes: {
      type: DataTypes.JSON, // Array of usernames who liked the review by
      defaultValue: ["k"], // Default value is an array with a single empty string
    },
    byloves: {
      type: DataTypes.JSON, // Array of usernames who loved the review by
      defaultValue: ["k"], // Default value is an array with a single empty string
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("approved", "pending"),
      defaultValue: "pending",
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Review;
