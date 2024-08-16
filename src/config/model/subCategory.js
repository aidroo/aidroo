import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const SubCategory = sequelize.define(
  "SubCategory",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
      allowNull: false, // Ensure each subcategory is linked to a category
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false, // Ensure a name is provided
    },
  },
  {
    timestamps: true,
  }
);

export default SubCategory;
