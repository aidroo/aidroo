import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const User = sequelize.define(
  "User",
  {
    // Define attributes
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(
        "personal",
        "business",
        "admin",
        "editor",
        "reviewer",
        "becreator"
      ),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default to false if users are not verified by default
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetTokenExpire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // New FCM token fields
    fcmToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fcmTokenExpire: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
