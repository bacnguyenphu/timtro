'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.STRING, // Kiểu dữ liệu
      allowNull: false,       // Không cho phép null
      defaultValue: 'R1'  // Giá trị mặc định
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'User');
  }
};
