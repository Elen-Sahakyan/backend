'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Cart, {
        foreignKey: 'userId',
        as: 'cart',
        onDelete: 'CASCADE'
      })
      
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'orders',
        onDelete: 'CASCADE'
      })

      User.hasMany(models.Review, {
        foreignKey: 'userId',
        as: 'reviews',
        onDelete: 'CASCADE'
      })
    }
    
    toJSON () {
      const user = this.get();
      delete user.password;
      return user;
    }
  }

  User.init({
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }, 
    role: {
      type: DataTypes.ENUM('customer', 'admin'),
      defaultValue: 'customer'
    } 
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: true
  });

  return User;
};