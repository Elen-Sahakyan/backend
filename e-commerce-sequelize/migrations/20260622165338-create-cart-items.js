'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cart_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'carts',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }, 
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        }
      }, 
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      } 
    });
  
    await queryInterface.addConstraint('cart_items', {
      fields: ['quantity'],
      type: 'check',
      where: {
        quantity: {
          [Sequelize.Op.gt]: 0
        }
      },
      name: 'products_quantity_check'
    })

    await queryInterface.addConstraint('cart_items', {
      fields: ['product_id', 'cart_id'],
      type: 'unique',
      name: 'cart_and_product_unique'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items');
  }
};