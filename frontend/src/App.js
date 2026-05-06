import React, { useState, useEffect } from 'react';
import './App.css';
import AuthPage from './pages/AuthPage';
import AppointmentPage from './pages/AppointmentPage';
import ProviderDashboard from './pages/ProviderDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Appointment Booking System</h1>
        {user && (
          <div className="user-info">
            <span>
              Welcome, {user.name} {user.role === 'provider' && '(Provider)'}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </header>
      <main>
        {!user ? (
          <AuthPage onAuthSuccess={handleAuthSuccess} />
        ) : user.role === 'provider' ? (
          <ProviderDashboard user={user} />
        ) : (
          <AppointmentPage user={user} />
        )}
      </main>
    </div>
  );
}

export default App;
