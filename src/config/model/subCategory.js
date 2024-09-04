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

// const Subcategory = sequelize.define(
//   "Subcategory",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING(255),
//       unique: true,
//       allowNull: false,
//     },
//     category_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "Categories", // Make sure this matches the actual table name
//         key: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "SET NULL",
//       allowNull: true, // Allow NULL since onDelete is SET NULL
//     },
//   },
//   {
//     timestamps: true, // Automatically adds createdAt and updatedAt fields
//   }
// );

// export default Subcategory;
