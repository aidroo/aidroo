// models/address.js
import { DataTypes } from "sequelize";
import sequelize from "../sequalize";
// Ensure the path is correct

const Address = sequelize.define(
  "Address",
  {
    // Define attributes
    username: {
      type: DataTypes.STRING,
      references: {
        model: "Users",
        key: "username",
      },
      allowNull: false,
      // onDelete: "CASCADE",
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING,
      defaultValue: null,
    },

    address: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
  }
);

export default Address;
