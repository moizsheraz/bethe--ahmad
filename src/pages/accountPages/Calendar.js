import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';

const Calender = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleDateChange = (date) => {
    setDate(date);
    setSelectedDate(date);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventName('');
    setEventDescription('');
  };

  const addEvent = () => {
    if (eventName && eventDescription) {
      setEvents([...events, { date: selectedDate, name: eventName, description: eventDescription }]);
      closeModal();
    }
  };

  const shareEvent = (event) => {
    const shareMessage = `Event: ${event.name} on ${event.date.toDateString()}\nDescription: ${event.description}`;
    navigator.share({
      title: 'Event Invitation',
      text: shareMessage,
    }).catch(console.error);
  };

  return (
    <div className="calendar-page">
      <h1 className="page-title">Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <button className="add-event-button" onClick={openModal} disabled={!selectedDate}>
        Add Event
      </button>
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <p><strong>{event.date.toDateString()}</strong></p>
            <p>{event.name}</p>
            <p>{event.description}</p>
            <button className="share-button" onClick={() => shareEvent(event)}>Share Event</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={`modal ${isModalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Add Event</h2>
              <button className="modal-close" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <textarea
                placeholder="Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={addEvent}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;
