'use strict';

const { hashPass } = require('../utils/passwordVerification');
const { 
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = require('../config/env');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const password = await hashPass(ADMIN_PASSWORD);

    await queryInterface.bulkInsert('users', [{
      name: 'Administrator',
      email: ADMIN_EMAIL,
      password: password,
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      email: ADMIN_EMAIL
    });
  }
};
