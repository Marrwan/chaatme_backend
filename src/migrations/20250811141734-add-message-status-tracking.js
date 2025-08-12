'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Add message status tracking fields
      await queryInterface.addColumn('messages', 'status', {
        type: Sequelize.ENUM('pending', 'sent', 'delivered', 'read'),
        allowNull: false,
        defaultValue: 'pending',
        comment: 'Message delivery status: pending -> sent -> delivered -> read'
      }, { transaction });

      await queryInterface.addColumn('messages', 'sent_at', {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When message was sent to server'
      }, { transaction });

      await queryInterface.addColumn('messages', 'delivered_at', {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When message was delivered to recipient device'
      }, { transaction });

      await queryInterface.addColumn('messages', 'temp_message_id', {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Temporary ID for client-side message tracking'
      }, { transaction });

      await queryInterface.addColumn('messages', 'sequence_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Server-assigned sequence ID for message ordering'
      }, { transaction });

      // Add indexes for performance
      await queryInterface.addIndex('messages', ['status'], { transaction });
      await queryInterface.addIndex('messages', ['sent_at'], { transaction });
      await queryInterface.addIndex('messages', ['delivered_at'], { transaction });
      await queryInterface.addIndex('messages', ['temp_message_id'], { transaction });
      await queryInterface.addIndex('messages', ['sequence_id'], { transaction });

      // Add presence tracking to users table (check if columns exist first)
      const userTableInfo = await queryInterface.describeTable('users');
      
      if (!userTableInfo.last_seen_at) {
        await queryInterface.addColumn('users', 'last_seen_at', {
          type: Sequelize.DATE,
          allowNull: true,
          comment: 'Last time user was online'
        }, { transaction });
      }
      
      if (!userTableInfo.is_online) {
        await queryInterface.addColumn('users', 'is_online', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: 'Current online status'
        }, { transaction });
      }

      // Add indexes if they don't exist
      try {
        await queryInterface.addIndex('users', ['last_seen_at'], { transaction });
      } catch (error) {
        // Index might already exist, continue
      }
      
      try {
        await queryInterface.addIndex('users', ['is_online'], { transaction });
      } catch (error) {
        // Index might already exist, continue
      }

      // Add typing indicators table
      await queryInterface.createTable('typing_indicators', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        conversation_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'conversations',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        started_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        expires_at: {
          type: Sequelize.DATE,
          allowNull: false,
          comment: 'When typing indicator expires'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      }, { transaction });

      // Add indexes for typing indicators
      await queryInterface.addIndex('typing_indicators', ['user_id'], { transaction });
      await queryInterface.addIndex('typing_indicators', ['conversation_id'], { transaction });
      await queryInterface.addIndex('typing_indicators', ['expires_at'], { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Remove typing indicators table
      await queryInterface.dropTable('typing_indicators', { transaction });

      // Remove user presence fields
      await queryInterface.removeIndex('users', ['is_online'], { transaction });
      await queryInterface.removeIndex('users', ['last_seen_at'], { transaction });
      await queryInterface.removeColumn('users', 'is_online', { transaction });
      await queryInterface.removeColumn('users', 'last_seen_at', { transaction });

      // Remove message status fields
      await queryInterface.removeIndex('messages', ['sequence_id'], { transaction });
      await queryInterface.removeIndex('messages', ['temp_message_id'], { transaction });
      await queryInterface.removeIndex('messages', ['delivered_at'], { transaction });
      await queryInterface.removeIndex('messages', ['sent_at'], { transaction });
      await queryInterface.removeIndex('messages', ['status'], { transaction });
      await queryInterface.removeColumn('messages', 'sequence_id', { transaction });
      await queryInterface.removeColumn('messages', 'temp_message_id', { transaction });
      await queryInterface.removeColumn('messages', 'delivered_at', { transaction });
      await queryInterface.removeColumn('messages', 'sent_at', { transaction });
      await queryInterface.removeColumn('messages', 'status', { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
