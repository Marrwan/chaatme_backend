'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add new columns (only add if they don't exist)
    try {
      await queryInterface.addColumn('match_preferences', 'same_interests', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      });
    } catch (error) {
      console.log('Column same_interests might already exist:', error.message);
    }

    try {
      await queryInterface.addColumn('match_preferences', 'same_hobbies', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      });
    } catch (error) {
      console.log('Column same_hobbies might already exist:', error.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove new columns
    try {
      await queryInterface.removeColumn('match_preferences', 'same_interests');
    } catch (error) {
      console.log('Column same_interests might not exist:', error.message);
    }

    try {
      await queryInterface.removeColumn('match_preferences', 'same_hobbies');
    } catch (error) {
      console.log('Column same_hobbies might not exist:', error.message);
    }
  }
};
