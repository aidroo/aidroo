import { DataTypes } from "sequelize";
import sequelize from "../sequalize";
 

const Conversation = sequelize.define(
  "Conversation",
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
  },
  {
    timestamps: true,
  }
);

export default Conversation;
