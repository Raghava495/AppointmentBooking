const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService');
const logger = require('../config/logger');

// Helper function to set secure auth cookie
const setAuthCookie = (res, token) => {
  res.cookie('authToken', token, {
    httpOnly: true,           // Prevents JavaScript access (XSS protection)
    secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
    sameSite: 'lax',          // CSRF protection
    maxAge: 24 * 60 * 60 * 1000  // 24 hours
  });
};

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const result = await AuthService.register(email, password, name, role);
    
    // Set authentication cookie
    setAuthCookie(res, result.token);
    
    // Return user data (without token in body for security)
    res.status(201).json({
      user: result.user,
      message: 'Registration successful'
    });
  } catch (error) {
    logger.error(`Register route error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    
    // Set authentication cookie
    setAuthCookie(res, result.token);
    
    // Return user data (without token in body for security)
    res.status(200).json({
      user: result.user,
      message: 'Login successful'
    });
  } catch (error) {
    logger.error(`Login route error: ${error.message}`);
    res.status(401).json({ message: error.message });
  }
});

router.post('/logout', (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    logger.error(`Logout route error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;