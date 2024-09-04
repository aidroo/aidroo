import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const Job = sequelize.define(
  "Job",
  {
    username: {
      type: DataTypes.STRING(255), // Explicitly define the length of username
      references: {
        model: "Users", // Ensure this model name matches your "Users" table
        key: "username",
      },
      allowNull: false,
      // onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255), // Set a reasonable length for the job title
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // Use TEXT for longer descriptions
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT, // Use DECIMAL for precision (10 digits total, 2 after decimal)
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255), // Set a reasonable length for location
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON, // Allows storing an array or object of images
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON, // Allows storing an array of tags as JSON
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("approved", "pending"),
      defaultValue: "pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default Job;

// import { DataTypes } from "sequelize";
// import sequelize from "../sequalize";

// const Job = sequelize.define(
//   "Job",
//   {
//     username: {
//       type: DataTypes.STRING(255),
//       references: {
//         model: "Users",
//         key: "username",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "CASCADE",
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     currency: {
//       type: DataTypes.ENUM("USD", "GBP", "EUR"),
//       allowNull: false,
//       defaultValue: "USD",
//     },
//     priceType: {
//       type: DataTypes.ENUM("negotiable", "fixed"),
//       allowNull: true,
//       defaultValue: "negotiable",
//     },
//     category_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "Categories",
//         key: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "SET NULL",
//       allowNull: true, // Allow NULL since onDelete is SET NULL
//     },
//     subcategory_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: "Subcategories",
//         key: "id",
//       },
//       onUpdate: "CASCADE",
//       onDelete: "SET NULL",
//       allowNull: true, // Allow NULL since onDelete is SET NULL
//     },
//     location: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     country: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     startDate: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },
//     endDate: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//     },
//     images: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     tags: {
//       type: DataTypes.JSON,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM("approved", "pending"),
//       defaultValue: "pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default Job;
