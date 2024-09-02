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
