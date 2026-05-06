const { Appointment, User } = require('../models');
const logger = require('../config/logger');

class AppointmentService {
  static async createAppointment(userId, providerId, date, time, notes) {
    try {
      const appointment = await Appointment.create({
        userId,
        providerId,
        date,
        time,
        status: 'pending',
        notes,
      });
      logger.info(`Appointment created: ${appointment.id}`);
      return appointment;
    } catch (error) {
      logger.error(`Create appointment error: ${error.message}`);
      throw error;
    }
  }

  static async getAvailableSlots(providerId, date) {
    try {
      const booked = await Appointment.findAll({
        where: { providerId, date, status: ['confirmed', 'pending'] },
        attributes: ['time'],
      });

      const bookedTimes = booked.map(a => a.time);
      const allSlots = this.generateTimeSlots();
      const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

      return availableSlots;
    } catch (error) {
      logger.error(`Get available slots error: ${error.message}`);
      throw error;
    }
  }

  static generateTimeSlots() {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
      }
    }
    return slots;
  }

  static async updateAppointmentStatus(appointmentId, status) {
    try {
      const appointment = await Appointment.findByPk(appointmentId);
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      appointment.status = status;
      await appointment.save();
      logger.info(`Appointment ${appointmentId} status updated to ${status}`);
      return appointment;
    } catch (error) {
      logger.error(`Update appointment error: ${error.message}`);
      throw error;
    }
  }

  static async getUserAppointments(userId) {
    try {
      const appointments = await Appointment.findAll({
        where: { userId },
        include: [
          { model: User, as: 'provider', attributes: ['id', 'name', 'email'] }
        ],
      });
      return appointments;
    } catch (error) {
      logger.error(`Get user appointments error: ${error.message}`);
      throw error;
    }
  }

  static async cancelAppointment(appointmentId) {
    try {
      const appointment = await Appointment.findByPk(appointmentId);
      if (!appointment) {
        throw new Error('Appointment not found');
      }
      appointment.status = 'cancelled';
      await appointment.save();
      logger.info(`Appointment ${appointmentId} cancelled`);
      return appointment;
    } catch (error) {
      logger.error(`Cancel appointment error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = AppointmentService;