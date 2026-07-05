'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      }),

      Cart.belongsToMany(models.Product, {
        through: 'cart_items',
        foreignKey: 'cartId',
        otherKey: 'productId',
        as: 'products',
        onDelete: 'CASCADE'
      })
    }
  }

  Cart.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    } 
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    underscored: true,
    timestamps: true
  });
  return Cart;
};