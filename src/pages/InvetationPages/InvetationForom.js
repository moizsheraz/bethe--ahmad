import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import './InvitationForom.css'; 

const InvitationForm = ({ listOfGifts, childName }) => {
    const [invitation, setInvitation] = useState({
        name: childName,
        age: '',
        place: '',
        mydate: null,
        time: '',
        description: '',
        list: listOfGifts
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/invitation/${childName}`, { state: invitation });
    };

    return (
        <div className="invitation-modal">
            <div className="invitation-modal-content">
                <div className="invitation-modal-header">
                    <h2>Invitation for {childName}</h2>
                    <button className="close-btn" onClick={() => navigate('/')}>X</button>
                </div>
                <div className="invitation-modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="text"
                                id="age"
                                value={invitation.age}
                                onChange={(e) => setInvitation({ ...invitation, age: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="place">Location</label>
                            <input
                                type="text"
                                id="place"
                                value={invitation.place}
                                onChange={(e) => setInvitation({ ...invitation, place: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <DatePicker
                            className='date'
                                selected={invitation.mydate} 
                                onChange={(date) => setInvitation({ ...invitation, mydate: date })}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Choose Date"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input
                                type="text"
                                id="time"
                                value={invitation.time}
                                onChange={(e) => setInvitation({ ...invitation, time: e.target.value })}
                                placeholder="HH:mm"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description (Optional)</label>
                            <textarea
                                id="description"
                                value={invitation.description}
                                onChange={(e) => setInvitation({ ...invitation, description: e.target.value })}
                            ></textarea>
                        </div>
                        <div >
                            <button type="submit">Share Invitation</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InvitationForm;
