const express = require('express');
const winston = require('winston');
const logger = require('./config/logger');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const providerRoutes = require('./routes/providers');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

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