import { DataTypes } from "sequelize";
import sequelize from "../sequalize";
// Assuming this is your Sequelize instance

const ReviewLike = sequelize.define(
  "ReviewLike",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: "Users", // Should match your User model name
        key: "username",
      },
      onDelete: "CASCADE", // If the user is deleted, remove the like
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Reviews", // Should match your Review model name
        key: "id",
      },
      onDelete: "CASCADE", // If the review is deleted, remove the like
    },
    type: {
      type: DataTypes.ENUM("like", "love"), // Enum to differentiate between a like or love
      allowNull: false,
    },
  },
  {
    timestamps: true, // Keep track of when the like/love was created
  }
);

export default ReviewLike;
