import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const Job = sequelize.define(
  "Job",
  {
    username: {
      type: DataTypes.STRING(255),
      references: {
        model: "Users",
        key: "username",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    currency: {
      type: DataTypes.ENUM("USD", "GBP", "EUR"),
      allowNull: false,
      defaultValue: "USD",
    },
    priceType: {
      type: DataTypes.ENUM("negotiable", "fixed"),
      allowNull: true,
      defaultValue: "negotiable",
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Subcategories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("approved", "pending"),
      defaultValue: "pending",
    },
    applications: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Default value set to 0
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Job;
