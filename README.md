# Appointment Booking System

A full-stack web application that allows clients to book appointments with service providers and receive reminders.

## Features

- **User Authentication**: Self-registration and login for both clients and service providers
- **Appointment Scheduling**: Book appointments with available time slots
- **Calendar View**: Interactive calendar to view and manage appointments
- **Appointment Cancellation**: Cancel booked appointments
- **Provider Management**: Browse and select from available service providers
- **Error Handling**: Comprehensive error handling and logging

## Tech Stack

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **PostgreSQL** - Relational database
- **JWT** - Authentication token management
- **Bcryptjs** - Password hashing
- **Winston** - Logging
- **Mocha/Chai** - Testing framework

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **React Calendar** - Calendar component

## Project Structure

```
AppBookingSys/
├── backend/
│   ├── config/
│   │   ├── config.json      # Database configuration
│   │   └── logger.js        # Winston logger setup
│   ├── models/
│   │   ├── user.js          # User model
│   │   ├── appointment.js    # Appointment model
│   │   └── index.js         # Model associations
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── appointments.js   # Appointment routes
│   │   └── providers.js      # Provider routes
│   ├── services/
│   │   ├── authService.js         # Authentication logic
│   │   └── appointmentService.js   # Appointment logic
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── migrations/          # Database migrations
│   ├── seeders/            # Database seeders
│   ├── test/               # Test files
│   └── server.js           # Entry point
│
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AuthPage.js          # Login/Register page
│   │   │   └── AppointmentPage.js   # Booking page
│   │   ├── App.js          # Main app component
│   │   ├── App.css         # App styles
│   │   └── index.js        # React entry point
│   └── package.json
│
└── .github/
    └── copilot-instructions.md
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 12 or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd AppBookingSys
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Database Setup**
   - Update `backend/config/config.json` with your PostgreSQL credentials
   - Default configuration uses:
     - Username: postgres
     - Password: password
     - Host: 127.0.0.1
     - Databases: appbookingsys_dev, appbookingsys_test, appbookingsys_prod

2. **Environment Variables**
   - Create a `.env` file in the backend directory:
     ```
     NODE_ENV=development
     PORT=3001
     JWT_SECRET=your-secret-key
     ```

### Database Setup

```bash
cd backend

# Run migrations
npx sequelize-cli db:migrate

# (Optional) Seed the database
npx sequelize-cli db:seed:all
```

### Running the Application

#### Backend
```bash
cd backend

# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:3001`

#### Frontend
```bash
cd frontend

# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user

#### Appointments
- `POST /api/appointments` - Create a new appointment (authenticated)
- `GET /api/appointments` - Get user's appointments (authenticated)
- `GET /api/appointments/available/:providerId/:date` - Get available slots
- `PUT /api/appointments/:id/status` - Update appointment status (authenticated)
- `PUT /api/appointments/:id/cancel` - Cancel appointment (authenticated)

#### Providers
- `GET /api/providers` - Get all providers
- `GET /api/providers/:id` - Get provider details

## User Roles

- **Client**: Can register, book appointments, view their appointments, and cancel bookings
- **Provider**: Can register as service provider and manage their availability (future enhancement)

## Testing

```bash
cd backend

# Run tests
npm test
```

## Logging

Winston logger is configured to:
- Log to console (development)
- Write error logs to `error.log`
- Write all logs to `combined.log`

## Future Enhancements

1. **Email/SMS Reminders**: Integration with email/SMS services for appointment reminders
2. **Provider Dashboard**: Dashboard for service providers to manage appointments and availability
3. **Rating and Reviews**: Client reviews for service providers
4. **Notifications**: Real-time notifications for appointment updates
5. **Payment Integration**: Online payment processing
6. **Recurring Appointments**: Support for recurring bookings
7. **Admin Panel**: System administrator controls
8. **Mobile App**: Native mobile application

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

ISC

## Support

For issues and questions, please contact the development team.
