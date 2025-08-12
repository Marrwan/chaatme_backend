const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

// Configure multer for profile picture uploads
const profilePictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/profile-pictures');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp and random string
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    const ext = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    cb(null, filename);
  }
});

const profilePictureUpload = multer({
  storage: profilePictureStorage,
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

/**
 * @route   GET /api/user/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile',
  authenticateToken,
  userController.getProfile
);

/**
 * @route   PUT /api/user/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile',
  authenticateToken,
  validate(schemas.updateProfile),
  userController.updateProfile
);

/**
 * @route   POST /api/user/change-password
 * @desc    Change user password
 * @access  Private
 */
router.post('/change-password',
  authenticateToken,
  validate(schemas.changePassword),
  userController.changePassword
);

/**
 * @route   DELETE /api/user/account
 * @desc    Delete user account
 * @access  Private
 */
router.delete('/account',
  authenticateToken,
  userController.deleteAccount
);

/**
 * @route   GET /api/user/dashboard
 * @desc    Get user dashboard data
 * @access  Private
 */
router.get('/dashboard',
  authenticateToken,
  userController.getDashboard
);

/**
 * @route   GET /api/user/list
 * @desc    Get list of users for chat
 * @access  Private
 */
router.get('/list',
  authenticateToken,
  userController.getUsers
);

/**
 * @route   GET /api/user/users
 * @desc    Get all users (for group creation)
 * @access  Private
 */
router.get('/users',
  authenticateToken,
  userController.getUsers
);

/**
 * @route   GET /api/user/search
 * @desc    Search users
 * @access  Private
 */
router.get('/search',
  authenticateToken,
  userController.searchUsers
);



/**
 * @route   POST /api/user/dating-profile-picture
 * @desc    Upload dating profile picture
 * @access  Private
 */
router.post('/dating-profile-picture',
  authenticateToken,
  profilePictureUpload.single('profilePicture'),
  userController.uploadDatingProfilePicture
);



/**
 * @route   DELETE /api/user/dating-profile-picture
 * @desc    Delete dating profile picture
 * @access  Private
 */
router.delete('/dating-profile-picture',
  authenticateToken,
  userController.deleteDatingProfilePicture
);

module.exports = router; 