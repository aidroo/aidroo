import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const ReplyReview = sequelize.define(
  "ReplyReview",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reviewId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Reviews",
        key: "id",
      },
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255), // Refers to the user replying to the review
      references: {
        model: "Users",
        key: "username",
      },
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT, // The reply content
      allowNull: false,
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    love: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default ReplyReview;
