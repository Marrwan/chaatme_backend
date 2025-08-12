'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Add type column to conversations table
      await queryInterface.addColumn('conversations', 'type', {
        type: Sequelize.ENUM('direct', 'group'),
        allowNull: false,
        defaultValue: 'direct'
      }, { transaction });

      // Add group_id column if it doesn't exist
      await queryInterface.addColumn('conversations', 'group_id', {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'groups',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }, { transaction });

      // Add name column for group chats
      await queryInterface.addColumn('conversations', 'name', {
        type: Sequelize.STRING,
        allowNull: true
      }, { transaction });

      // Add description column for group chats
      await queryInterface.addColumn('conversations', 'description', {
        type: Sequelize.TEXT,
        allowNull: true
      }, { transaction });

      // Add last_message_at column
      await queryInterface.addColumn('conversations', 'last_message_at', {
        type: Sequelize.DATE,
        allowNull: true
      }, { transaction });

      // Add is_active column
      await queryInterface.addColumn('conversations', 'is_active', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }, { transaction });

      // Add indexes
      await queryInterface.addIndex('conversations', ['type'], { transaction });
      await queryInterface.addIndex('conversations', ['group_id'], { transaction });
      await queryInterface.addIndex('conversations', ['last_message_at'], { transaction });

      await transaction.commit();
      console.log('Successfully added type and related columns to conversations table');
      
    } catch (error) {
      await transaction.rollback();
      console.error('Error adding columns to conversations table:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Remove indexes
      await queryInterface.removeIndex('conversations', ['type'], { transaction });
      await queryInterface.removeIndex('conversations', ['group_id'], { transaction });
      await queryInterface.removeIndex('conversations', ['last_message_at'], { transaction });

      // Remove columns
      await queryInterface.removeColumn('conversations', 'is_active', { transaction });
      await queryInterface.removeColumn('conversations', 'last_message_at', { transaction });
      await queryInterface.removeColumn('conversations', 'description', { transaction });
      await queryInterface.removeColumn('conversations', 'name', { transaction });
      await queryInterface.removeColumn('conversations', 'group_id', { transaction });
      await queryInterface.removeColumn('conversations', 'type', { transaction });

      await transaction.commit();
      console.log('Successfully removed type and related columns from conversations table');
      
    } catch (error) {
      await transaction.rollback();
      console.error('Error removing columns from conversations table:', error);
      throw error;
    }
  }
};
