'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    return queryInterface.bulkInsert('Users', [
      {
        email: 'doctor1@example.com',
        password: hashedPassword,
        name: 'Dr. Sarah Johnson',
        role: 'provider',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'doctor2@example.com',
        password: hashedPassword,
        name: 'Dr. Michael Chen',
        role: 'provider',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'therapist1@example.com',
        password: hashedPassword,
        name: 'Emma Wilson - Therapist',
        role: 'provider',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'beautician@example.com',
        password: hashedPassword,
        name: 'Sophie Martinez - Beauty Specialist',
        role: 'provider',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'trainer@example.com',
        password: hashedPassword,
        name: 'James Rodriguez - Fitness Trainer',
        role: 'provider',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {
      role: 'provider'
    }, {});
  }
};
