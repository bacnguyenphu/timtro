'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('overViews', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING
            },
            code: {
                type: Sequelize.STRING
            },
            area: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            target: {
                type: Sequelize.STRING
            },
            created: {
                type: Sequelize.DATE
            },
            expired: {
                type: Sequelize.DATE
            },
            bonus: {
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
        await queryInterface.dropTable('overViews');
    }
};