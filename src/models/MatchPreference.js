const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const MatchPreference = sequelize.define('MatchPreference', {
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
    ageMin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'age_min',
      validate: {
        min: 18,
        max: 100
      }
    },
    ageMax: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'age_max',
      validate: {
        min: 18,
        max: 100
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'marital_status'
    },
    complexion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bodySize: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'body_size'
    },
    sameInterests: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'same_interests'
    },
    sameHobbies: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'same_hobbies'
    }
  }, {
    tableName: 'match_preferences',
    timestamps: true,
    underscored: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id']
      }
    ]
  });

  // Define associations
  MatchPreference.associate = (models) => {
    MatchPreference.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return MatchPreference;
}; 