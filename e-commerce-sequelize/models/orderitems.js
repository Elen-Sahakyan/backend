'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderItems.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      })

      OrderItems.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      })
    }
  }
  OrderItems.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    }, 
    priceAtPurchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }, 
  }, {
    sequelize,
    modelName: 'OrderItems',
    tableName: 'order_items',
    underscored: true,
    timestamps: false
  });
  return OrderItems;
};