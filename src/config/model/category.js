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
      allowNull: false,
      // onDelete: "CASCADE", // Ensure each subcategory is linked to a category
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

// import { DataTypes } from "sequelize";
// import sequelize from "../sequalize";

// const Category = sequelize.define(
//   "Category",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true, // Automatically increment the ID
//     },
//     name: {
//       type: DataTypes.STRING(255),
//       unique: true,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: true, // Automatically adds createdAt and updatedAt fields
//   }
// );

// export default Category;
