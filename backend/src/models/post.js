'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Attribute, { foreignKey: 'attributesId', as: 'attribute' })
      Post.belongsTo(models.Image, { foreignKey: 'imagesId', as: 'images' })
      Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      // Post.belongsTo(models.Category,{foreignKey: 'categoryCode',targetKey:'code', as: 'category'})
    }
  }
  Post.init({
    title: DataTypes.STRING,
    stars: DataTypes.STRING,
    labelCode: DataTypes.STRING,
    address: DataTypes.STRING,
    attributesId: DataTypes.STRING,
    categoryCode: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.STRING,
    overViewId: DataTypes.STRING,
    imagesId: DataTypes.STRING,
    priceCode: DataTypes.STRING,
    areaCode: DataTypes.STRING,
    provinceCode: DataTypes.STRING,
    priceNumber: DataTypes.FLOAT,
    areaNumber: DataTypes.FLOAT,
    wardCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};