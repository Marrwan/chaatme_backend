'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Check if messages table exists first
      const tables = await queryInterface.showAllTables();
      if (!tables.includes('messages')) {
        console.log('⚠️  Messages table does not exist yet, skipping this migration');
        await transaction.commit();
        return;
      }

      console.log('Fixing message content constraint...');
      
      // Make content column nullable to allow file messages without text content
      await queryInterface.changeColumn('messages', 'content', {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Text content of the message (nullable for file messages)'
      }, { transaction });
      
      console.log('✅ Made content column nullable');
      
      await transaction.commit();
      console.log('✅ Message content constraint fixed successfully');
      
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Error fixing message content constraint:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Check if messages table exists first
      const tables = await queryInterface.showAllTables();
      if (!tables.includes('messages')) {
        console.log('⚠️  Messages table does not exist, skipping rollback');
        await transaction.commit();
        return;
      }

      // Revert content column to NOT NULL
      await queryInterface.changeColumn('messages', 'content', {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Text content of the message'
      }, { transaction });
      
      console.log('✅ Reverted content column to NOT NULL');
      
      await transaction.commit();
      console.log('✅ Reverted message content constraint changes');
      
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Error reverting message content constraint:', error);
      throw error;
    }
  }
};
