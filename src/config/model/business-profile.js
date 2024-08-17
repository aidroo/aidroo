import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const BusinessProfile = sequelize.define(
  "BusinessProfile",
  {
    username: {
      type: DataTypes.STRING(255),
      references: {
        model: "Users",
        key: "username",
      },

      allowNull: false,
    },
    businessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    profileThumb: {
      type: DataTypes.STRING(1000),
      allowNull: true, // allowNull: true is more explicit than defaultValue: null
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
      type: DataTypes.ENUM("approved", "pending", "deleted"), // Enum values as strings
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
  },
  {
    timestamps: true,
  }
);

export default BusinessProfile;
