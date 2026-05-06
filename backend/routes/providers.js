const express = require('express');
const router = express.Router();
const { User, Appointment } = require('../models');
const authMiddleware = require('../middleware/auth');
const logger = require('../config/logger');

// Get appointments for current provider (authenticated) - MUST BE BEFORE /:id
router.get('/my-appointments', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { providerId: req.user.id },
      include: [
        { model: User, as: 'client', attributes: ['id', 'name', 'email'] }
      ],
      order: [['date', 'DESC'], ['time', 'DESC']],
    });
    res.status(200).json(appointments);
  } catch (error) {
    logger.error(`Get provider appointments error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Get all providers
router.get('/', async (req, res) => {
  try {
    const providers = await User.findAll({
      where: { role: 'provider' },
      attributes: ['id', 'name', 'email'],
    });
    res.status(200).json(providers);
  } catch (error) {
    logger.error(`Get providers route error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Get provider details
router.get('/:id', async (req, res) => {
  try {
    const provider = await User.findOne({
      where: { id: req.params.id, role: 'provider' },
      attributes: ['id', 'name', 'email'],
    });
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.status(200).json(provider);
  } catch (error) {
    logger.error(`Get provider route error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;