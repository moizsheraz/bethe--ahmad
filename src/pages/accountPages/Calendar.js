import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar.css";
import { useChild } from "../context/ChildContext";
import { firestore } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import ChildList from "./ChildList";

const CalendarComponent = () => {
  const { childrenData } = useChild();
  const [children, setChildren] = useState(
    childrenData.map((child) => ({
      ...child,
      gifts: child.gifts || [],
      friends: child.friends || [],
      invitations: child.invitations || [],
      events: child.events || [],
    }))
  );
  const [selectedChild, setSelectedChild] = useState(null);
  const [value, onChange] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const openModal = (event = null) => {
    if (event) {
      setEventName(event.name);
      setEventDescription(event.description);
      setEditingEvent(event);
    } else {
      setEventName("");
      setEventDescription("");
      setEditingEvent(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addEvent = async (childId, event) => {
    const updatedChildren = children.map((child) =>
      child.id === childId
        ? { ...child, events: [...child.events, event] }
        : child
    );
    setChildren(updatedChildren);

    const childRef = doc(firestore, "children", childId);
    await updateDoc(childRef, {
      events: updatedChildren.find((child) => child.id === childId).events,
    });
  };

  const deleteEvent = async (childId, eventId) => {
    const updatedChildren = children.map((child) =>
      child.id === childId
        ? {
            ...child,
            events: child.events.filter((event) => event.id !== eventId),
          }
        : child
    );
    setChildren(updatedChildren);

    const childRef = doc(firestore, "children", childId);
    await updateDoc(childRef, {
      events: updatedChildren.find((child) => child.id === childId).events,
    });
  };

  const handleAddOrUpdateEvent = () => {
    if (eventName && eventDescription) {
      const event = {
        id: editingEvent ? editingEvent.id : Date.now(),
        date: value.toISOString(),
        name: eventName,
        description: eventDescription,
      };
      if (editingEvent) {
        updateEvent(selectedChild.id, event);
      } else {
        addEvent(selectedChild.id, event);
      }
      closeModal();
    }
  };

  const updateEvent = (childId, updatedEvent) => {
    const updatedChildren = children.map((child) =>
      child.id === childId
        ? {
            ...child,
            events: child.events.map((event) =>
              event.id === updatedEvent.id ? updatedEvent : event
            ),
          }
        : child
    );
    setChildren(updatedChildren);

    const childRef = doc(firestore, "children", childId);
    updateDoc(childRef, {
      events: updatedChildren.find((child) => child.id === childId).events,
    });
  };

  const shareEvent = (event) => {
    const shareMessage = `Event: ${event.name} on ${new Date(
      event.date
    ).toDateString()}\nDescription: ${event.description}`;
    navigator
      .share({
        title: "Event Invitation",
        text: shareMessage,
      })
      .catch(console.error);
  };

  return (
    <div className="calendar-page">
      <div className="child-list">
        <ChildList children={children} setSelectedChild={setSelectedChild} />
      </div>
      {selectedChild && (
        <>
          <h1 className="page-title">Calendar for {selectedChild.name}</h1>
          <div className="calendar-container">
            <Calendar onChange={onChange} value={value} />
          </div>
          <button
            className="add-event-button"
            onClick={() => openModal()}
            disabled={!value}
          >
            Add Event
          </button>
          <div className="events-list">
            {selectedChild.events.map((event, index) => (
              <div key={index} className="event-card">
                <div className="balloon"></div>
                <div className="event-card-content">
                  <h3>{new Date(event.date).toDateString()}</h3>
                  <p>{event.name}</p>
                  <p>{event.description}</p>
                  <button
                    style={{
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => openModal(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    style={{
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => deleteEvent(selectedChild.id, event.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      color: "white",

                      border: "none",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => shareEvent(event)}
                  >
                    Share Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingEvent ? "Edit Event" : "Add Event"}
              </h2>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
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
              <button onClick={handleAddOrUpdateEvent}>
                {editingEvent ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
