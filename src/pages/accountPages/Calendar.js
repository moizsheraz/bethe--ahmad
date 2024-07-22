import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/calendar.css';

const CalendarComponent = ({ childName, events = [], addEvent, updateEvent, deleteEvent }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
    setSelectedDate(date);
  };

  const openModal = (event = null) => {
    if (event) {
      setEventName(event.name);
      setEventDescription(event.description);
      setSelectedDate(new Date(event.date));
      setEditingEvent(event);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventName('');
    setEventDescription('');
    setEditingEvent(null);
  };

  const handleAddOrUpdateEvent = () => {
    if (eventName && eventDescription && selectedDate) {
      if (editingEvent) {
        updateEvent(childName, { ...editingEvent, date: selectedDate, name: eventName, description: eventDescription });
      } else {
        addEvent(childName, { id: Date.now(), date: selectedDate, name: eventName, description: eventDescription });
      }
      closeModal();
    }
  };

  const shareEvent = (event) => {
    const shareMessage = `Event: ${event.name} on ${new Date(event.date).toDateString()}\nDescription: ${event.description}`;
    navigator.share({
      title: 'Event Invitation',
      text: shareMessage,
    }).catch(console.error);
  };

  return (
    <div className="calendar-page">
      <h1 className="page-title">Calendar for {childName}</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <button className="add-event-button" onClick={() => openModal()} disabled={!selectedDate}>
        Add Event
      </button>
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <p><strong>{new Date(event.date).toDateString()}</strong></p>
            <p>{event.name}</p>
            <p>{event.description}</p>
            <button className="share-button" onClick={() => shareEvent(event)}>Share Event</button>
            <button onClick={() => openModal(event)}>Edit</button>
            <button onClick={() => deleteEvent(childName, event.id)}>Delete</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={`modal ${isModalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
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
              <button onClick={handleAddOrUpdateEvent}>{editingEvent ? 'Update' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
