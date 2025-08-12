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

      // Check if is_deleted column exists
      const tableInfo = await queryInterface.describeTable('messages');
      
      if (!tableInfo.is_deleted) {
        console.log('Adding is_deleted column to messages table...');
        await queryInterface.addColumn('messages', 'is_deleted', {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        }, { transaction });
        console.log('✅ is_deleted column added');
      } else {
        console.log('is_deleted column already exists');
      }

      // Check if reply_to_message_id column exists
      if (!tableInfo.reply_to_message_id) {
        console.log('Adding reply_to_message_id column to messages table...');
        await queryInterface.addColumn('messages', 'reply_to_message_id', {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'messages',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }, { transaction });
        console.log('✅ reply_to_message_id column added');
      } else {
        console.log('reply_to_message_id column already exists');
      }

      // Skip index creation to avoid hanging - indexes can be added later if needed
      console.log('⚠️  Skipping index creation to avoid migration hanging');

      await transaction.commit();
      console.log('✅ Successfully updated messages table');
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Error updating messages table:', error);
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

      // Remove columns
      const tableInfo = await queryInterface.describeTable('messages');
      
      if (tableInfo.reply_to_message_id) {
        await queryInterface.removeColumn('messages', 'reply_to_message_id', { transaction });
      }
      
      if (tableInfo.is_deleted) {
        await queryInterface.removeColumn('messages', 'is_deleted', { transaction });
      }

      await transaction.commit();
      console.log('✅ Successfully reverted messages table changes');
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Error reverting messages table changes:', error);
      throw error;
    }
  }
};
