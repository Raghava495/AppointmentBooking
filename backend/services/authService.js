const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const logger = require('../config/logger');

class AuthService {
  static async register(email, password, name, role = 'client') {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const user = await User.create({ email, password, name, role });
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      logger.info(`User registered: ${email}`);
      return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
    } catch (error) {
      logger.error(`Registration error: ${error.message}`);
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      logger.info(`User logged in: ${email}`);
      return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token };
    } catch (error) {
      logger.error(`Login error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = AuthService;