 
import { DataTypes } from "sequelize";
import sequelize from "../sequalize";
  // Fix spelling of the sequelize import

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    readStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    replyTo: {
      type: DataTypes.INTEGER,
      references: {
        model: "Message", // Self-reference
        key: "id",
      },
      allowNull: true,
    },
  },
  {
    timestamps: true,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }
);

export default Message;