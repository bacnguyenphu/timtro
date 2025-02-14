'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Districs', {
      // _id: DataTypes.STRING,
      // name: DataTypes.STRING,
      // type: DataTypes.STRING,
      // slug: DataTypes.STRING,
      // name_with_type: DataTypes.STRING,
      // path: DataTypes.STRING,
      // path_with_type: DataTypes.STRING,
      // code: DataTypes.STRING,
      // parent_code: DataTypes.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      name_with_type: {
        type: Sequelize.STRING
      },
      path: {
        type: Sequelize.STRING
      },
      path_with_type: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      parent_code: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Districs');
  }
};