require('dotenv').config();

const config = {
  app: {
    name: 'ChaatMe',
    port: process.env.PORT || 3001,
    environment: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
  
  database: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'chaatme_dev',
    username: process.env.DB_USER || 'chaatme_user',
    password: process.env.DB_PASSWORD || 'chaatme_password',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    passwordResetExpiresIn: '1h'
  },
  
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: process.env.EMAIL_SECURE === 'true' || true,
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'no-reply@chaatme.com'
  },
  
  security: {
    bcryptRounds: 12,
    rateLimitWindow: 15 * 60 * 1000, // 15 minutes
    rateLimitMax: 100, // limit each IP to 100 requests per windowMs
    corsOptions: {
      origin: [ 
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'https://chaatme.com',
        'https://*.netlify.app',
        'https://*.com'
      ],
      credentials: true
    }
  }
};

module.exports = config; 