import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ProviderDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, cancelled

  const token = localStorage.getItem('token');

  const fetchProviderAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/providers/my-appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProviderAppointments();
  }, [fetchProviderAppointments]);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      await axios.put(
        `/api/appointments/${appointmentId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProviderAppointments();
      alert(`Appointment ${newStatus} successfully`);
    } catch (err) {
      setError('Failed to update appointment');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  return (
    <div className="provider-dashboard">
      <h1>Provider Dashboard</h1>
      <p className="provider-info">Welcome, {user.name}</p>

      {error && <div className="error-message">{error}</div>}

      <div className="filter-section">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select 
          id="status-filter"
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Appointments</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="appointments-stats">
        <div className="stat-box">
          <h3>{appointments.length}</h3>
          <p>Total Appointments</p>
        </div>
        <div className="stat-box">
          <h3>{appointments.filter(a => a.status === 'confirmed').length}</h3>
          <p>Confirmed</p>
        </div>
        <div className="stat-box">
          <h3>{appointments.filter(a => a.status === 'pending').length}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-box">
          <h3>{appointments.filter(a => a.status === 'cancelled').length}</h3>
          <p>Cancelled</p>
        </div>
      </div>

      <div className="appointments-section">
        <h2>Booked Appointments ({filteredAppointments.length})</h2>
        {loading ? (
          <p>Loading appointments...</p>
        ) : filteredAppointments.length === 0 ? (
          <p className="no-appointments">
            {filter === 'all' 
              ? 'No appointments yet.' 
              : `No ${filter} appointments.`}
          </p>
        ) : (
          <div className="appointments-list">
            {filteredAppointments.map(apt => (
              <div key={apt.id} className="appointment-card provider-card">
                <div className="appointment-header">
                  <h3>{apt.client?.name}</h3>
                  <span className={`status-badge status-${apt.status}`}>
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                </div>
                
                <div className="appointment-details">
                  <p>
                    <strong>Date:</strong> {new Date(apt.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {apt.time}
                  </p>
                  <p>
                    <strong>Client Email:</strong> {apt.client?.email}
                  </p>
                  {apt.notes && (
                    <p>
                      <strong>Notes:</strong> {apt.notes}
                    </p>
                  )}
                </div>

                {apt.status === 'pending' && (
                  <div className="action-buttons">
                    <button
                      className="btn-confirm"
                      onClick={() => handleStatusUpdate(apt.id, 'confirmed')}
                    >
                      Confirm
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => handleStatusUpdate(apt.id, 'cancelled')}
                    >
                      Decline
                    </button>
                  </div>
                )}

                {apt.status === 'confirmed' && (
                  <div className="action-buttons">
                    <button
                      className="btn-cancel"
                      onClick={() => handleStatusUpdate(apt.id, 'cancelled')}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {apt.status === 'cancelled' && (
                  <div className="status-info">
                    <p className="cancelled-text">This appointment has been cancelled</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
