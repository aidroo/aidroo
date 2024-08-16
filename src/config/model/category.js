// Ensure the correct path to your database configuration

import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Category;
