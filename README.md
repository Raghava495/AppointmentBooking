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
- Git

### Setup from Scratch on a New Machine

Follow these steps to clone and set up the project on a fresh machine:

#### 1. **Install Required Software**

**Windows:**
- Download and install Node.js 18+ from [nodejs.org](https://nodejs.org)
- Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
- During PostgreSQL installation, remember the password for the `postgres` user
- Download and install Git from [git-scm.com](https://git-scm.com)

**macOS:**
```bash
# Using Homebrew
brew install node@18
brew install postgresql@15
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm postgresql postgresql-contrib git
```

#### 2. **Clone the Repository**

```bash
# Clone from GitHub
git clone https://github.com/Raghava495/AppointmentBooking.git

# Navigate into the project directory
cd AppointmentBooking
```

#### 3. **Create PostgreSQL Database**

```bash
# Log in to PostgreSQL (Windows/macOS/Linux)
psql -U postgres

# Create development database
CREATE DATABASE appbookingsys_dev;

# Create test database
CREATE DATABASE appbookingsys_test;

# Create production database
CREATE DATABASE appbookingsys_prod;

# Exit psql
\q
```

#### 4. **Configure Backend**

```bash
cd backend

# Update database credentials in config.json
# Edit backend/config/config.json with your PostgreSQL settings
# Example:
# "development": {
#   "username": "postgres",
#   "password": "your-password",
#   "database": "appbookingsys_dev",
#   "host": "127.0.0.1",
#   "port": 5432,
#   "dialect": "postgres"
# }

# Create .env file (optional, for additional configuration)
cat > .env << EOF
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-key-change-this-in-production
EOF
```

#### 5. **Setup Backend Dependencies**

```bash
# Install dependencies
npm install

# Run database migrations
npx sequelize-cli db:migrate

# Seed the database with sample providers (optional)
npx sequelize-cli db:seed:all
```

#### 6. **Setup Frontend**

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

#### 7. **Verify Installation**

```bash
# From the frontend directory, check if all dependencies are installed
npm list

# Go back to project root
cd ..
```

### Quick Start

Once setup is complete:

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
Backend will be available at `http://localhost:3001`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```
Frontend will be available at `http://localhost:3000`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raghava495/AppointmentBooking.git
   cd AppointmentBooking
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

## Troubleshooting

### Common Setup Issues

**Issue: PostgreSQL connection failed**
- Verify PostgreSQL is running
- Check credentials in `backend/config/config.json`
- Ensure databases are created with correct names
- Try connecting manually: `psql -U postgres -d appbookingsys_dev`

**Issue: Port 3001 or 3000 already in use**
```bash
# Change port in backend/.env
PORT=3002

# Change frontend port
cd frontend
PORT=3002 npm start
```

**Issue: npm install fails**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Migration errors**
```bash
# Undo last migration
npx sequelize-cli db:migrate:undo

# Redo migrations
npx sequelize-cli db:migrate
```

**Issue: Module not found errors**
```bash
# Delete node_modules in both backend and frontend
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

### Verifying Setup

Test that everything is working:

1. **Backend health check:**
   ```bash
   curl http://localhost:3001/api/health
   # or just visit the endpoint in browser
   ```

2. **Frontend loads:**
   - Open `http://localhost:3000` in browser
   - Should see the login/register page

3. **Database connection:**
   ```bash
   cd backend
   npx sequelize-cli db:migrate:status
   # Should show all migrations as "up"
   ```

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
