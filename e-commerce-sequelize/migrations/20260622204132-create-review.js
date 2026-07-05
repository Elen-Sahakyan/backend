'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
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
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      comment: {
        type: Sequelize.TEXT
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

    await queryInterface.addConstraint('reviews', {
      fields: ['rating'],
      type: 'check',
      where: {
        rating: {
          [Sequelize.Op.between]: [1, 5]
        }
      },
      name: 'reviews_rating_check'
    })

    await queryInterface.addConstraint('reviews', {
      fields: ['user_id', 'product_id'],
      type: 'unique',
      name: 'reviews_unique_check'
    })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};