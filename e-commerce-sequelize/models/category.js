'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: 'ProductCategory',
        foreignKey: 'categoryId',
        otherKey: 'productId',
        as: 'products'
      })
    }
  }
  Category.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }, 
    description: {
      type: DataTypes.TEXT
    } 
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    underscored: true,
    timestamps: false
  });

  return Category;
};