'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change love_language from STRING to TEXT to support multiple values
    await queryInterface.changeColumn('users', 'love_language', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'User love language preferences (can store multiple values as JSON or comma-separated)'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert back to STRING
    await queryInterface.changeColumn('users', 'love_language', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'User love language preference'
    });
  }
};
