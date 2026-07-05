'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    queryInterface.addConstraint('products', {
      fields: ['price'],
      type: 'check',
      where: {
        price: {
          [Sequelize.Op.gt]: 1
        }
      },
      name: 'products_price_check'
    });

    queryInterface.addConstraint('products', {
      fields: ['stock'],
      type: 'check',
      where: {
        stock: {
          [Sequelize.Op.gt]: 0
        }
      },
      name: 'products_stock_check'
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};