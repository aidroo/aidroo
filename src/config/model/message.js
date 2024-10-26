 
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
    senderUser: {
      type: DataTypes.STRING(255),
      references: {
        model: "Users",
        key: "username",
      },
    },
    receiverUser: {
      type: DataTypes.STRING(255),
      references: {
        model: "Users",
        key: "username",
      },
    },
    conversationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Conversations",
        key: "id",
      },
      allowNull: false,
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
     
  }
);

export default Message;