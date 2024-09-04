import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    dialect: "mysql",
    dialectModule: require("mysql2"),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
    define: {
      timestamps: true,
    },
  }
);

export default sequelize;
