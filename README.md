# ChaatMe Backend API

A secure, scalable backend API built with Express.js, Sequelize, and PostgreSQL for the ChaatMe dating application.

## Features

- 🔐 **Authentication & Authorization**: JWT-based auth with password reset
- 🗄️ **Database**: PostgreSQL with Sequelize ORM
- 🛡️ **Security**: Password hashing, rate limiting, input validation
- 📧 **Email**: Password reset and welcome emails
- 🧪 **Testing**: Comprehensive test suite with Jest
- 📚 **Documentation**: Well-documented API endpoints
- 🚀 **Production Ready**: Environment-based configuration
- 💬 **Real-time Messaging**: WebSocket-based chat system
- 📞 **Audio/Video Calling**: WebRTC integration for calls

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Validation**: Joi
- **Testing**: Jest + Supertest
- **Email**: Nodemailer
- **Real-time**: Socket.IO
- **Calls**: WebRTC

## Quick Start

### Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Database Setup**
   ```bash
   # Create databases
   createdb chaatme_dev
   createdb chaatme_test

   # Run migrations
   npm run db:migrate
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   Server runs on `http://localhost:3001`

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3001 |
| `NODE_ENV` | Environment | No | development |
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_EXPIRES_IN` | Token expiration | No | 1d |
| `EMAIL_HOST` | SMTP host | Yes | - |
| `EMAIL_PORT` | SMTP port | No | 587 |
| `EMAIL_USER` | SMTP username | Yes | - |
| `EMAIL_PASS` | SMTP password | Yes | - |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:3000 |

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | Login user | No |
| `POST` | `/api/auth/logout` | Logout user | Yes |
| `POST` | `/api/auth/forgot-password` | Request password reset | No |
| `POST` | `/api/auth/reset-password` | Reset password with token | No |
| `GET` | `/api/auth/profile` | Get current user profile | Yes |

### Messaging

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/chat/conversations` | Get user conversations | Yes |
| `POST` | `/api/chat/conversations` | Create new conversation | Yes |
| `GET` | `/api/chat/conversations/:id/messages` | Get conversation messages | Yes |
| `POST` | `/api/chat/conversations/:id/messages` | Send message | Yes |

### Calling

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/calls/initiate` | Start a call | Yes |
| `POST` | `/api/calls/:id/answer` | Answer a call | Yes |
| `POST` | `/api/calls/:id/reject` | Reject a call | Yes |
| `POST` | `/api/calls/:id/end` | End a call | Yes |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm run test:watch
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Run database seeds
- `npm run db:reset` - Reset database

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   ├── utils/           # Utility functions
│   └── server.js        # App entry point
├── docs/                # Documentation
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Prevent brute force attacks
- **Input Validation**: Joi schema validation
- **CORS Protection**: Configurable cross-origin requests
- **Helmet.js**: Security headers
- **Environment Variables**: Sensitive data protection

## Production Deployment

### Render Deployment

This project is configured for deployment on Render:

1. **Connect Repository**: Link your GitHub repository to Render
2. **Environment Setup**: Set production environment variables in Render dashboard
3. **Database**: Render will automatically provision a PostgreSQL database
4. **Deploy**: Render will automatically deploy on push to main branch

### Environment Variables for Production

Set these in your Render dashboard:

- `NODE_ENV=production`
- `DATABASE_URL` (auto-provided by Render)
- `JWT_SECRET` (generate a secure random string)
- `JWT_EXPIRES_IN=7d`
- `FRONTEND_URL=https://chaatme-frontend.netlify.app`
- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS` (for email functionality)

## Contributing

1. Follow the coding standards
2. Write tests for new features
3. Update documentation
4. Ensure all tests pass before committing

## License

MIT License - see LICENSE file for details 