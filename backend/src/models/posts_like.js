'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Posts_like extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Posts_like.init({
        id_user: DataTypes.STRING,
        id_post: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Posts_like',
    });
    return Posts_like;
};