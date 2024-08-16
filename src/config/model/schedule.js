import { DataTypes } from "sequelize";
import sequelize from "../sequalize";

const Schedule = sequelize.define(
  "Schedule",
  {
    username: {
      type: DataTypes.STRING,
      references: {
        model: "Users",
        key: "username",
      },
      allowNull: false,
    },
    day: {
      type: DataTypes.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ),
      allowNull: false, // Make sure a day is always specified
    },
    openingTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closingTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("open", "closed"),
      defaultValue: "closed",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Schedule;
