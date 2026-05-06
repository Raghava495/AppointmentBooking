const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService');
const logger = require('../config/logger');

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const result = await AuthService.register(email, password, name, role);
    res.status(201).json(result);
  } catch (error) {
    logger.error(`Register route error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    logger.error(`Login route error: ${error.message}`);
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;