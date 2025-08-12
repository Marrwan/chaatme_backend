const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://localhost:5432/choice_talent', {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    paranoid: false 
  }
});

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const MatchPreference = require('./MatchPreference')(sequelize, Sequelize.DataTypes);
const DatePlan = require('./DatePlan')(sequelize, Sequelize.DataTypes);
const Conversation = require('./Conversation')(sequelize, Sequelize.DataTypes);
const Message = require('./Message')(sequelize, Sequelize.DataTypes);
const MessageAttachment = require('./MessageAttachment')(sequelize);
const Call = require('./Call')(sequelize, Sequelize.DataTypes);
const GroupCall = require('./GroupCall')(sequelize);
const CallParticipant = require('./CallParticipant')(sequelize);
const CallHistory = require('./CallHistory')(sequelize);
const Plan = require('./Plan')(sequelize, Sequelize.DataTypes);
const Subscription = require('./Subscription')(sequelize, Sequelize.DataTypes);
const Group = require('./group')(sequelize, Sequelize.DataTypes);
const GroupMember = require('./group-member')(sequelize, Sequelize.DataTypes);
const GroupCallParticipant = require('./GroupCallParticipant')(sequelize, Sequelize.DataTypes);



// Email Campaign models
const EmailCampaign = require('./EmailCampaign')(sequelize, Sequelize.DataTypes);
const EmailLog = require('./EmailLog')(sequelize, Sequelize.DataTypes);
const TypingIndicator = require('./TypingIndicator')(sequelize, Sequelize.DataTypes);

// Set up model associations using the associate methods
const models = {
  User,
  MatchPreference,
  DatePlan,
  Conversation,
  Message,
  MessageAttachment,
  Call,
  GroupCall,
  CallParticipant,
  CallHistory,
  Plan,
  Subscription,
  Group,
  GroupMember,
  GroupCallParticipant,
  EmailCampaign,
  EmailLog,
  TypingIndicator
};

// Call associate methods if they exist
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

const db = {
  sequelize,
  Sequelize,
  User,
  MatchPreference,
  DatePlan,
  Conversation,
  Message,
  MessageAttachment,
  Call,
  GroupCall,
  CallParticipant,
  CallHistory,
  Plan,
  Subscription,
  Group,
  GroupMember,
  GroupCallParticipant,
  EmailCampaign,
  EmailLog,
  TypingIndicator
};

module.exports = db; 