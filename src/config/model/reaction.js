import { DataTypes } from "sequelize";
import sequelize from "../sequalize";
import Review from "./review";
import User from "./user";

// Reaction Model
const Reaction = sequelize.define(
  "Reaction",
  {
    type: {
      type: DataTypes.ENUM("like", "love"),
      allowNull: false,
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Review,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    profileId: {
      type: DataTypes.STRING, // Update to STRING to match the type of 'username' in User
      allowNull: false,
      references: {
        model: User,
        key: "username",
      },
      onDelete: "CASCADE",
    },
    createdBy: {
      type: DataTypes.STRING, // New field to track who created the reaction
      allowNull: false,
      references: {
        model: User,
        key: "username",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);

export default Reaction;
