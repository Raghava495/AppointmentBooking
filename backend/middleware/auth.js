const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const authMiddleware = (req, res, next) => {
  try {
    // Try to get token from cookies first (cookie-based auth)
    let token = req.cookies?.authToken;
    
    // Fallback to Authorization header (Bearer token) for compatibility
    if (!token) {
      token = req.headers.authorization?.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(`Auth error: ${error.message}`);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;