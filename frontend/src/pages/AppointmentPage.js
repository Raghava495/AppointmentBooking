import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Configure axios to include credentials (cookies) in all requests
axios.defaults.withCredentials = true;

const AppointmentPage = ({ user }) => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [notes, setNotes] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProviders = useCallback(async () => {
    try {
      const response = await axios.get('/api/providers');
      setProviders(response.data);
    } catch (err) {
      setError('Failed to fetch providers');
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      // Token is now in secure cookie, no need to pass in header
      const response = await axios.get('/api/appointments');
      setAppointments(response.data);
    } catch (err) {
      setError('Failed to fetch appointments');
    }
  }, []);

  useEffect(() => {
    fetchProviders();
    fetchAppointments();
  }, [fetchProviders, fetchAppointments]);

  const fetchAvailableSlots = async (providerId, date) => {
    try {
      setLoading(true);
      const dateString = date.toISOString().split('T')[0];
      const response = await axios.get(`/api/appointments/available/${providerId}/${dateString}`);
      setAvailableSlots(response.data.availableSlots);
    } catch (err) {
      setError('Failed to fetch available slots');
    } finally {
      setLoading(false);
    }
  };

  const handleProviderChange = (e) => {
    const providerId = e.target.value;
    setSelectedProvider(providerId);
    if (providerId) {
      fetchAvailableSlots(providerId, selectedDate);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (selectedProvider) {
      fetchAvailableSlots(selectedProvider, date);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedProvider || !selectedSlot) {
      setError('Please select a provider and time slot');
      return;
    }

    try {
      setLoading(true);
      const dateString = selectedDate.toISOString().split('T')[0];
      await axios.post(
        '/api/appointments',
        {
          providerId: selectedProvider,
          date: dateString,
          time: selectedSlot,
          notes,
        }
      );
      setError('');
      setSelectedProvider(null);
      setSelectedSlot(null);
      setNotes('');
      fetchAppointments();
      alert('Appointment booked successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.put(
        `/api/appointments/${appointmentId}/cancel`,
        {}
      );
      fetchAppointments();
      alert('Appointment cancelled');
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  return (
    <div className="appointment-container">
      <h1>Book an Appointment</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="booking-section">
        <div className="form-group">
          <label htmlFor="provider">Select Provider</label>
          <select value={selectedProvider || ''} onChange={handleProviderChange}>
            <option value="">-- Select a Provider --</option>
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        {selectedProvider && (
          <>
            <div className="form-group">
              <label>Select Date</label>
              <Calendar value={selectedDate} onChange={handleDateChange} minDate={new Date()} />
            </div>

            {availableSlots.length > 0 && (
              <div className="form-group">
                <label>Available Time Slots</label>
                <div className="time-slots">
                  {availableSlots.map(slot => (
                    <button
                      key={slot}
                      className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about your appointment"
              />
            </div>

            <button onClick={handleBookAppointment} disabled={loading}>
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </>
        )}
      </div>

      <div className="appointments-section">
        <h2>Your Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map(apt => (
              <div key={apt.id} className="appointment-card">
                <h3>{apt.provider?.name}</h3>
                <p>Date: {new Date(apt.date).toLocaleDateString()}</p>
                <p>Time: {apt.time}</p>
                <p>Status: {apt.status}</p>
                {apt.notes && <p>Notes: {apt.notes}</p>}
                {apt.status !== 'cancelled' && (
                  <button onClick={() => handleCancelAppointment(apt.id)}>
                    Cancel Appointment
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;