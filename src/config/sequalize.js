import { Sequelize } from "sequelize";

// sequelize.js
// const sequelize = new Sequelize(
//   "mysql://mysql:cqr2nFckfPDz8IzGLothwxK4CWUws6StIz6al70GpPdCnca7g6h65ULEJSi2xtsw@38.45.71.124:3306/default"
// );

// export default sequelize;

// import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "default",
  "mysql",
  "cqr2nFckfPDz8IzGLothwxK4CWUws6StIz6al70GpPdCnca7g6h65ULEJSi2xtsw",
  {
    dialect: "mysql",
    dialectModule: require("mysql2"),
    host: "38.45.71.124",
    port: 3306,
    logging: false,
    define: {
      timestamps: true,
    },
  }
);
// import { Sequelize } from "sequelize";
// //
// // const sequelize = new Sequelize(process.env.DATABASE_URL, {
// //   dialect: "mysql", // Change this according to your database type
// //   dialectModule: require("mysql2"),
// //   logging: false,
// // });

export default sequelize;

// mysql://mysql:43MLCNWGrtKyVsrOnMHswnTOKr6s3dfBJpVG6pu427ZwQVQVcaqDgI44qkWZ9du2@38.45.71.124:5432/default
