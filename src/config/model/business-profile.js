import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const BusinessProfile = sequelize.define(
  "BusinessProfile",
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
      onDelete: "CASCADE", // Cascade delete when user is deleted
    },
    businessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profileThumb: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("approved", "pending", "deleted"),
      defaultValue: "pending",
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    top: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    guaranteed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    claimed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    funds: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employees: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    spent: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    workwith: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gallery: {
      type: DataTypes.JSON, // Storing gallery as a JSON field
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default BusinessProfile;
