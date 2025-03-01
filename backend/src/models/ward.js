'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ward extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Ward.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        slug: DataTypes.STRING,
        name_with_type: DataTypes.STRING,
        path: DataTypes.STRING,
        path_with_type: DataTypes.STRING,
        code: DataTypes.STRING,
        parent_code: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Ward',
    });
    return Ward;
};