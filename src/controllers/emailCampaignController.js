const emailCampaignService = require('../services/emailCampaignService');
const { validationResult } = require('express-validator');

/**
 * Create a new email campaign
 */
const createCampaign = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      name,
      subject,
      template,
      targetAudience,
      customEmailList,
      emailsPerHour,
      scheduledAt
    } = req.body;

    // Additional validation
    if (!name || !subject || !template) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, subject, and template are required'
      });
    }

    if (template.length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Template must be at least 50 characters long'
      });
    }

    const campaignData = {
      name,
      subject,
      template,
      targetAudience: targetAudience || 'incomplete_profiles',
      customEmailList: customEmailList || [],
      emailsPerHour: emailsPerHour || 45,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      createdBy: req.user.id
    };

    const result = await emailCampaignService.createCampaign(campaignData);

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: result
    });
  } catch (error) {
    console.error('Error creating campaign:', error);
    
    // Handle specific database errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      });
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'Campaign with this name already exists',
        error: error.message
      });
    }
    
    // Default to 500 for server errors
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get all campaigns with pagination
 */
const getAllCampaigns = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const result = await emailCampaignService.getAllCampaigns(
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json({
      success: true,
      message: 'Campaigns retrieved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error getting campaigns:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get campaigns',
      error: error.message
    });
  }
};

/**
 * Get campaign by ID
 */
const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await emailCampaignService.getCampaignStats(id);

    res.status(200).json({
      success: true,
      message: 'Campaign retrieved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error getting campaign:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get campaign',
      error: error.message
    });
  }
};

/**
 * Start a campaign
 */
const startCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await emailCampaignService.startCampaign(id);

    res.status(200).json({
      success: true,
      message: 'Campaign started successfully',
      data: result
    });
  } catch (error) {
    console.error('Error starting campaign:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start campaign',
      error: error.message
    });
  }
};

/**
 * Pause a campaign
 */
const pauseCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await emailCampaignService.pauseCampaign(id);

    res.status(200).json({
      success: true,
      message: 'Campaign paused successfully',
      data: result
    });
  } catch (error) {
    console.error('Error pausing campaign:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to pause campaign',
      error: error.message
    });
  }
};

/**
 * Resume a campaign
 */
const resumeCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await emailCampaignService.resumeCampaign(id);

    res.status(200).json({
      success: true,
      message: 'Campaign resumed successfully',
      data: result
    });
  } catch (error) {
    console.error('Error resuming campaign:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resume campaign',
      error: error.message
    });
  }
};

/**
 * Send next batch of emails for active campaigns
 */
const sendNextBatch = async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await emailCampaignService.sendCampaignEmails(id);

    res.status(200).json({
      success: true,
      message: 'Batch sent successfully',
      data: result
    });
  } catch (error) {
    console.error('Error sending batch:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send batch',
      error: error.message
    });
  }
};

/**
 * Get campaign recipients preview
 */
const getCampaignRecipients = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    const recipients = await emailCampaignService.getCampaignRecipients(id);
    
    // Paginate recipients
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedRecipients = recipients.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      message: 'Recipients retrieved successfully',
      data: {
        recipients: paginatedRecipients,
        total: recipients.length,
        page: parseInt(page),
        totalPages: Math.ceil(recipients.length / limit)
      }
    });
  } catch (error) {
    console.error('Error getting recipients:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recipients',
      error: error.message
    });
  }
};

/**
 * Calculate campaign statistics
 */
const calculateCampaignStats = async (req, res) => {
  try {
    const { targetAudience, customEmailList } = req.body;
    
    const totalEmails = await emailCampaignService.calculateTotalEmails(
      targetAudience,
      customEmailList
    );

    res.status(200).json({
      success: true,
      message: 'Statistics calculated successfully',
      data: {
        targetAudience,
        totalEmails,
        estimatedDuration: Math.ceil(totalEmails / 45) // 45 emails per hour
      }
    });
  } catch (error) {
    console.error('Error calculating stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate statistics',
      error: error.message
    });
  }
};



module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  startCampaign,
  pauseCampaign,
  resumeCampaign,
  sendNextBatch,
  getCampaignRecipients,
  calculateCampaignStats,

}; 