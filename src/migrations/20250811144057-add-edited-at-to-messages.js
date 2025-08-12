'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add edited_at column to messages table
    await queryInterface.addColumn('messages', 'edited_at', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'When message was last edited'
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove edited_at column from messages table
    await queryInterface.removeColumn('messages', 'edited_at');
  }
};
