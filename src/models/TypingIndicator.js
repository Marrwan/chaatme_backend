const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TypingIndicator = sequelize.define('TypingIndicator', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'conversation_id',
      references: {
        model: 'conversations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'started_at'
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_at',
      comment: 'When typing indicator expires'
    }
  }, {
    tableName: 'typing_indicators',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['conversation_id']
      },
      {
        fields: ['expires_at']
      }
    ]
  });

  TypingIndicator.associate = (models) => {
    TypingIndicator.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    
    TypingIndicator.belongsTo(models.Conversation, {
      foreignKey: 'conversationId',
      as: 'conversation'
    });
  };

  // Instance methods
  TypingIndicator.prototype.isExpired = function() {
    return new Date() > this.expiresAt;
  };

  TypingIndicator.prototype.extendExpiry = function(minutes = 5) {
    this.expiresAt = new Date(Date.now() + minutes * 60 * 1000);
    return this.save();
  };

  return TypingIndicator;
};
