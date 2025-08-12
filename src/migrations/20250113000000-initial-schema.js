'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Create users table
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password_hash: {
          type: Sequelize.STRING,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        real_name: {
          type: Sequelize.STRING,
          allowNull: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true
        },
        interests: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        hobbies: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        love_language: {
          type: Sequelize.STRING,
          allowNull: true
        },
        profile_picture: {
          type: Sequelize.STRING,
          allowNull: true
        },
        dating_profile_picture: {
          type: Sequelize.STRING,
          allowNull: true
        },
        date_of_birth: {
          type: Sequelize.DATEONLY,
          allowNull: true
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: true
        },
        marital_status: {
          type: Sequelize.STRING,
          allowNull: true
        },
        height: {
          type: Sequelize.STRING,
          allowNull: true
        },
        complexion: {
          type: Sequelize.STRING,
          allowNull: true
        },
        body_size: {
          type: Sequelize.STRING,
          allowNull: true
        },
        occupation: {
          type: Sequelize.STRING,
          allowNull: true
        },
        country: {
          type: Sequelize.STRING,
          allowNull: true
        },
        state: {
          type: Sequelize.STRING,
          allowNull: true
        },
        lga: {
          type: Sequelize.STRING,
          allowNull: true
        },
        contact_number: {
          type: Sequelize.STRING,
          allowNull: true
        },
        is_email_verified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        email_verification_token: {
          type: Sequelize.STRING(1000),
          allowNull: true
        },
        email_verification_expires: {
          type: Sequelize.DATE,
          allowNull: true
        },
        password_reset_token: {
          type: Sequelize.STRING(1000),
          allowNull: true
        },
        password_reset_expires: {
          type: Sequelize.DATE,
          allowNull: true
        },
        last_login_at: {
          type: Sequelize.DATE,
          allowNull: true
        },
        is_online: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        last_seen: {
          type: Sequelize.DATE,
          allowNull: true
        },
        subscription_status: {
          type: Sequelize.ENUM('free', 'premium'),
          allowNull: false,
          defaultValue: 'free'
        },
        last_upgrade_reminder: {
          type: Sequelize.DATE,
          allowNull: true
        },
        upgrade_reminder_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create match_preferences table
      await queryInterface.createTable('match_preferences', {
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
        age_range_min: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        age_range_max: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        preferred_genders: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        preferred_locations: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        preferred_marital_status: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        preferred_religions: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        preferred_occupations: {
          type: Sequelize.TEXT,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create date_plans table
      await queryInterface.createTable('date_plans', {
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
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false
        },
        location: {
          type: Sequelize.STRING,
          allowNull: true
        },
        status: {
          type: Sequelize.ENUM('planned', 'completed', 'cancelled'),
          defaultValue: 'planned'
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create conversations table
      await queryInterface.createTable('conversations', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        participant1_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        participant2_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        last_message_id: {
          type: Sequelize.UUID,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create messages table
      await queryInterface.createTable('messages', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
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
        sender_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        message_type: {
          type: Sequelize.ENUM('text', 'image', 'file', 'audio', 'video'),
          defaultValue: 'text'
        },
        is_read: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        read_at: {
          type: Sequelize.DATE,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create message_attachments table
      await queryInterface.createTable('message_attachments', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        message_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'messages',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        uploaded_by: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        file_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        file_path: {
          type: Sequelize.STRING,
          allowNull: false
        },
        file_size: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        mime_type: {
          type: Sequelize.STRING,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create calls table
      await queryInterface.createTable('calls', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        caller_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        receiver_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        call_type: {
          type: Sequelize.ENUM('audio', 'video'),
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('initiated', 'ringing', 'answered', 'ended', 'missed', 'rejected'),
          defaultValue: 'initiated'
        },
        start_time: {
          type: Sequelize.DATE,
          allowNull: true
        },
        end_time: {
          type: Sequelize.DATE,
          allowNull: true
        },
        duration: {
          type: Sequelize.INTEGER,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create groups table (must exist before group_calls and group_members)
      await queryInterface.createTable('groups', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        created_by: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        is_private: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create group_calls table (after groups)
      await queryInterface.createTable('group_calls', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        group_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'groups',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        initiator_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        call_type: {
          type: Sequelize.ENUM('audio', 'video'),
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('active', 'ended'),
          defaultValue: 'active'
        },
        start_time: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        end_time: {
          type: Sequelize.DATE,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create call_participants table
      await queryInterface.createTable('call_participants', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        call_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'calls',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
        joined_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        left_at: {
          type: Sequelize.DATE,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create call_history table
      await queryInterface.createTable('call_history', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        call_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'calls',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
        action: {
          type: Sequelize.ENUM('initiated', 'answered', 'ended', 'missed', 'rejected'),
          allowNull: false
        },
        timestamp: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create plans table
      await queryInterface.createTable('plans', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        duration: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        features: {
          type: Sequelize.TEXT,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create subscriptions table
      await queryInterface.createTable('subscriptions', {
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
        plan_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'plans',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        status: {
          type: Sequelize.ENUM('active', 'expired', 'cancelled'),
          defaultValue: 'active'
        },
        start_date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // groups table moved above to satisfy FK dependencies

      // Create group_members table
      await queryInterface.createTable('group_members', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        group_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'groups',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
        added_by: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        role: {
          type: Sequelize.ENUM('member', 'admin'),
          defaultValue: 'member'
        },
        joined_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create group_call_participants table
      await queryInterface.createTable('group_call_participants', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        group_call_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'group_calls',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
        joined_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        left_at: {
          type: Sequelize.DATE,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create email_campaigns table
      await queryInterface.createTable('email_campaigns', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        subject: {
          type: Sequelize.STRING,
          allowNull: false
        },
        template: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        target_audience: {
          type: Sequelize.ENUM('all_users', 'custom_list'),
          allowNull: false
        },
        custom_email_list: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        status: {
          type: Sequelize.ENUM('draft', 'active', 'paused', 'completed'),
          defaultValue: 'draft'
        },
        emails_per_hour: {
          type: Sequelize.INTEGER,
          defaultValue: 50
        },
        sent_emails: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        failed_emails: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        created_by: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        started_at: {
          type: Sequelize.DATE,
          allowNull: true
        },
        completed_at: {
          type: Sequelize.DATE,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Create email_logs table
      await queryInterface.createTable('email_logs', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        campaign_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'email_campaigns',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        recipient_email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        recipient_name: {
          type: Sequelize.STRING,
          allowNull: true
        },
        status: {
          type: Sequelize.ENUM('pending', 'sent', 'failed'),
          defaultValue: 'pending'
        },
        message_id: {
          type: Sequelize.STRING,
          allowNull: true
        },
        error_message: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        retry_count: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        sent_at: {
          type: Sequelize.DATE,
          allowNull: true
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
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true
        }
      }, { transaction });

      // Add indexes
      await queryInterface.addIndex('users', ['email'], { transaction });
      await queryInterface.addIndex('users', ['username'], { transaction });
      await queryInterface.addIndex('users', ['subscription_status'], { transaction });
      await queryInterface.addIndex('match_preferences', ['user_id'], { transaction });
      await queryInterface.addIndex('date_plans', ['user_id'], { transaction });
      await queryInterface.addIndex('date_plans', ['status'], { transaction });
      await queryInterface.addIndex('conversations', ['participant1_id'], { transaction });
      await queryInterface.addIndex('conversations', ['participant2_id'], { transaction });
      await queryInterface.addIndex('messages', ['conversation_id'], { transaction });
      await queryInterface.addIndex('messages', ['sender_id'], { transaction });
      await queryInterface.addIndex('messages', ['created_at'], { transaction });
      await queryInterface.addIndex('message_attachments', ['message_id'], { transaction });
      await queryInterface.addIndex('calls', ['caller_id'], { transaction });
      await queryInterface.addIndex('calls', ['receiver_id'], { transaction });
      await queryInterface.addIndex('calls', ['status'], { transaction });
      await queryInterface.addIndex('group_calls', ['group_id'], { transaction });
      await queryInterface.addIndex('group_calls', ['status'], { transaction });
      await queryInterface.addIndex('call_participants', ['call_id'], { transaction });
      await queryInterface.addIndex('call_participants', ['user_id'], { transaction });
      await queryInterface.addIndex('call_history', ['call_id'], { transaction });
      await queryInterface.addIndex('call_history', ['user_id'], { transaction });
      await queryInterface.addIndex('subscriptions', ['user_id'], { transaction });
      await queryInterface.addIndex('subscriptions', ['status'], { transaction });
      await queryInterface.addIndex('groups', ['created_by'], { transaction });
      await queryInterface.addIndex('group_members', ['group_id'], { transaction });
      await queryInterface.addIndex('group_members', ['user_id'], { transaction });
      await queryInterface.addIndex('group_call_participants', ['group_call_id'], { transaction });
      await queryInterface.addIndex('group_call_participants', ['user_id'], { transaction });
      await queryInterface.addIndex('email_campaigns', ['created_by'], { transaction });
      await queryInterface.addIndex('email_campaigns', ['status'], { transaction });
      await queryInterface.addIndex('email_logs', ['campaign_id'], { transaction });
      await queryInterface.addIndex('email_logs', ['status'], { transaction });

      await transaction.commit();
      console.log('Successfully created all tables and indexes');
      
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating schema:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      // Drop tables in reverse dependency order
      await queryInterface.dropTable('email_logs', { transaction });
      await queryInterface.dropTable('email_campaigns', { transaction });
      await queryInterface.dropTable('group_call_participants', { transaction });
      await queryInterface.dropTable('group_members', { transaction });
      await queryInterface.dropTable('groups', { transaction });
      await queryInterface.dropTable('subscriptions', { transaction });
      await queryInterface.dropTable('plans', { transaction });
      await queryInterface.dropTable('call_history', { transaction });
      await queryInterface.dropTable('call_participants', { transaction });
      await queryInterface.dropTable('group_calls', { transaction });
      await queryInterface.dropTable('calls', { transaction });
      await queryInterface.dropTable('message_attachments', { transaction });
      await queryInterface.dropTable('messages', { transaction });
      await queryInterface.dropTable('conversations', { transaction });
      await queryInterface.dropTable('date_plans', { transaction });
      await queryInterface.dropTable('match_preferences', { transaction });
      await queryInterface.dropTable('users', { transaction });
      
      await transaction.commit();
      console.log('Successfully dropped all tables');
      
    } catch (error) {
      await transaction.rollback();
      console.error('Error dropping schema:', error);
      throw error;
    }
  }
}; 