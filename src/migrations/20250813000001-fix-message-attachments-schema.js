'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Check if required tables exist first
      const tables = await queryInterface.showAllTables();
      if (!tables.includes('messages') || !tables.includes('message_attachments')) {
        console.log('⚠️  Required tables do not exist yet, skipping this migration');
        await transaction.commit();
        return;
      }

      console.log('🔧 Fixing message attachments schema...');
      
      // Check current message_attachments table structure
      const attachmentColumns = await queryInterface.describeTable('message_attachments');
      const columnNames = Object.keys(attachmentColumns);
      
      console.log('📋 Current message_attachments columns:', columnNames);
      
      // Add missing columns if they don't exist
      const requiredColumns = {
        'original_name': {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'unnamed_file'
        },
        'file_url': {
          type: Sequelize.STRING,
          allowNull: false
        },
        'size': {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        'file_type': {
          type: Sequelize.STRING,
          allowNull: true
        },
        'thumbnail_url': {
          type: Sequelize.STRING,
          allowNull: true
        },
        'upload_status': {
          type: Sequelize.ENUM('pending', 'uploading', 'completed', 'failed'),
          defaultValue: 'pending',
          allowNull: false
        },
        'metadata': {
          type: Sequelize.JSONB,
          allowNull: true
        }
      };
      
      for (const [columnName, columnDef] of Object.entries(requiredColumns)) {
        if (!columnNames.includes(columnName)) {
          console.log(`Adding ${columnName} column...`);
          await queryInterface.addColumn('message_attachments', columnName, columnDef, { transaction });
          console.log(`✅ ${columnName} column added`);
        } else {
          console.log(`✅ ${columnName} column already exists`);
        }
      }
      
      // Skip index creation to avoid hanging
      console.log('⚠️  Skipping index creation to avoid migration hanging');
      
      await transaction.commit();
      console.log('✅ Message attachments schema fixed successfully');
      
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Error fixing message attachments schema:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Check if required tables exist first
      const tables = await queryInterface.showAllTables();
      if (!tables.includes('message_attachments')) {
        console.log('⚠️  message_attachments table does not exist, skipping rollback');
        await transaction.commit();
        return;
      }

      console.log('🔄 Reverting message attachments schema changes...');
      
      // Remove added columns
      const columnsToRemove = [
        'original_name', 'file_url', 'size', 'file_type', 
        'thumbnail_url', 'upload_status', 'metadata'
      ];
      
      const attachmentColumns = await queryInterface.describeTable('message_attachments');
      
      for (const columnName of columnsToRemove) {
        if (attachmentColumns[columnName]) {
          await queryInterface.removeColumn('message_attachments', columnName, { transaction });
          console.log(`✅ ${columnName} column removed`);
        }
      }
      
      await transaction.commit();
      console.log('✅ Message attachments schema reverted successfully');
      
    } catch (error) {
      await transaction.rollback();
      console.error('❌ Error reverting message attachments schema:', error);
      throw error;
    }
  }
};
