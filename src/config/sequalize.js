import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "default",
  process.env.DB_USER || "mysql",
  process.env.DB_PASSWORD ||
    "cqr2nFckfPDz8IzGLothwxK4CWUws6StIz6al70GpPdCnca7g6h65ULEJSi2xtsw",
  {
    dialect: "mysql",
    dialectModule: require("mysql2"),
    host: process.env.DB_HOST || "63.250.40.112",
    port: process.env.DB_PORT || 3306,
    logging: process.env.DB_LOGGING === "true" ? console.log : false,
    define: {
      timestamps: true,
    },
  }
);

/* *************production ******************/
// const sequelize = new Sequelize(
//   "default",
//   "mysql",
//   "cqr2nFckfPDz8IzGLothwxK4CWUws6StIz6al70GpPdCnca7g6h65ULEJSi2xtsw",
//   {
//     dialect: "mysql",
//     dialectModule: require("mysql2"),
//     host: "38.45.71.124",
//     port: 3306,
//     logging: false,
//     define: {
//       timestamps: true,
//     },
//   }
// );

/* *************development ******************/
// http://63.250.40.112:8000
// const sequelize = new Sequelize("db", "root", "password", {
//   dialect: "mysql",
//   dialectModule: require("mysql2"),
//   host: "localhost",
//   port: 3306,
//   logging: false,
//   define: {
//     timestamps: true,
//   },
// });

export default sequelize;

// mysql://mysql:n93KXIVpANF2QPaZAergNSHOMszEihK8ilJ42y3QcRv2i9RGBgdtWCIP94ctfKg6@n0ogcogwggk44g8kgs4ks480:3306/default
