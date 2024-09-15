import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const PersonalProfile = sequelize.define(
  "PersonalProfile",
  {
    username: {
      type: DataTypes.STRING(255), // Explicit length for the username
      references: {
        model: "Users", // Ensure this model name is correct
        key: "username",
      },
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(255), // Define length explicitly
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255), // Define length explicitly
      allowNull: false,
    },
    profileThumb: {
      type: DataTypes.STRING(1000), // Reduced length to 1000, still long enough for most URLs
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT, // Use TEXT for longer descriptions
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(20), // Use STRING for phone numbers, with a max length
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hireTimeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    activeOrderCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved"), // ENUM field for status
      defaultValue: "pending", // Default value set to 'pending'
      allowNull: false,
    },
  },
  {
    timestamps: true, // Enables createdAt and updatedAt fields automatically
  }
);

export default PersonalProfile;
