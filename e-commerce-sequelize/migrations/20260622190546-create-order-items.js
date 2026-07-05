'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price_at_purchase: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
    });

    await queryInterface.addConstraint('order_items', {
      fields: ['quantity'],
      type: 'check',
      where: {
        quantity: {
          [Sequelize.Op.gt]: 0
        }
      },
      name: 'orde_items_quantity_check'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  }
};