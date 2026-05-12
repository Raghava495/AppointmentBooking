const express = require('express');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const logger = require('./config/logger');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const providerRoutes = require('./routes/providers');

const app = express();
const port = process.env.PORT || 3001;

// CORS Configuration for cookie-based authentication
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,  // Allow cookies to be sent in cross-origin requests
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin === (process.env.FRONTEND_URL || 'http://localhost:3000')) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
// Parse cookies from request headers
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/providers', providerRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Appointment Booking System API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

module.exports = app;