const { User } = require('../models');
const { createError } = require('../utils/errorUtils');

/**
 * Middleware to check if user has premium subscription
 */
const requirePremium = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    if (!user.isPremium()) {
      return next(createError(403, 'Premium subscription required. Please upgrade to access this feature.'));
    }

    next();
  } catch (error) {
    // Preserve the original error status code if it exists
    if (error.statusCode) {
      next(error);
    } else {
      // If it's a database error or other internal error, return 500
      next(createError(500, 'Internal server error'));
    }
  }
};

/**
 * Middleware to check if user can access matchmaking
 */
const requireMatchmakingAccess = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    if (!user.canAccessMatchmaking()) {
      return next(createError(403, 'Upgrade to Premium to Activate Your Matchmaking Preference'));
    }

    next();
  } catch (error) {
    // Preserve the original error status code if it exists
    if (error.statusCode) {
      next(error);
    } else {
      // If it's a database error or other internal error, return 500
      next(createError(500, 'Internal server error'));
    }
  }
};

/**
 * Optional middleware to attach subscription status to request
 */
const attachSubscriptionStatus = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.id);
      if (user) {
        req.user.subscriptionStatus = user.subscriptionStatus;
        req.user.isPremium = user.isPremium();
        req.user.canAccessMatchmaking = user.canAccessMatchmaking();
      }
    }
    next();
  } catch (error) {
    // Preserve the original error status code if it exists
    if (error.statusCode) {
      next(error);
    } else {
      // If it's a database error or other internal error, return 500
      next(createError(500, 'Internal server error'));
    }
  }
};

module.exports = {
  requirePremium,
  requireMatchmakingAccess,
  attachSubscriptionStatus
}; 