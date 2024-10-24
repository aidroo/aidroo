 "use strict";

 module.exports = {
   up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable("Conversations", {
       id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
       },
       createdAt: {
         allowNull: false,
         type: Sequelize.DATE,
         defaultValue: Sequelize.fn("NOW"),
       },
       updatedAt: {
         allowNull: false,
         type: Sequelize.DATE,
         defaultValue: Sequelize.fn("NOW"),
       },
     });
   },

   down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable("Conversations");
   },
 };
