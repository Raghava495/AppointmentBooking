const express = require('express');
const router = express.Router();
const AppointmentService = require('../services/appointmentService');
const authMiddleware = require('../middleware/auth');
const logger = require('../config/logger');

// Create appointment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { providerId, date, time, notes } = req.body;
    const appointment = await AppointmentService.createAppointment(
      req.user.id,
      providerId,
      date,
      time,
      notes
    );
    res.status(201).json(appointment);
  } catch (error) {
    logger.error(`Create appointment route error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Get available slots for a provider on a specific date
router.get('/available/:providerId/:date', async (req, res) => {
  try {
    const { providerId, date } = req.params;
    const slots = await AppointmentService.getAvailableSlots(providerId, date);
    res.status(200).json({ availableSlots: slots });
  } catch (error) {
    logger.error(`Get available slots route error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Get user appointments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const appointments = await AppointmentService.getUserAppointments(req.user.id);
    res.status(200).json(appointments);
  } catch (error) {
    logger.error(`Get user appointments route error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Cancel appointment
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const appointment = await AppointmentService.cancelAppointment(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    logger.error(`Cancel appointment route error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Update appointment status
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await AppointmentService.updateAppointmentStatus(req.params.id, status);
    res.status(200).json(appointment);
  } catch (error) {
    logger.error(`Update appointment status route error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;