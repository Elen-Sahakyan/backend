'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItems.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      }),
      CartItems.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart',
        onDelete: 'CASCADE'
      })
    }
  }
  CartItems.init({
    cartId: {
      type: DataTypes.INTEGER,
    }, 
    productId: {
      type: DataTypes.INTEGER,
    }, 
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    } 
  }, {
    sequelize,
    modelName: 'CartItems',
    tableName: 'cart_items',
    underscored: true,
    timestamps: false
  });
  return CartItems;
};