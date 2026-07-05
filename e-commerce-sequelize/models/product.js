'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Category, {
        through: 'ProductCategory',
        foreignKey: 'productId',
        otherKey: 'categoryId',
        as: 'categories',
        onDelete: 'CASCADE'
      })

      Product.belongsToMany(models.Cart, {
        through: 'cartItem',
        foreignKey: 'productId',
        otherKey: 'cartId',
        as: 'carts'
      })
      
      Product.belongsToMany(models.Order, {
        through: 'orderItems',
        foreignKey: 'productId',
        otherKey: 'orderId',
        as: 'orders'
      })

      Product.hasMany(models.Review, {
        foreignKey: 'productId',
        as: 'reviews',
        onDelete: 'CASCADE'
      })
    }
  }

  Product.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }, 
    description: {
      type: DataTypes.TEXT,
    }, 
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 1
      }
    }, 
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    } 
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    underscored: true,
    timestamps: true
  });

  return Product;
};