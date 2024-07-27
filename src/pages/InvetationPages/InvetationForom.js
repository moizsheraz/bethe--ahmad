import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { firestore } from '../../firebase/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import './InvitationForm.css'; 

const InvitationForm = ({ listOfGifts, childName, childId, friends,summary }) => {
    console.log(summary)
    const [invitation, setInvitation] = useState({
        name: childName,
        place: '',
        mydate: null,
        time: '',
        description: '',
        list: listOfGifts,
        summary:summary
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const invitationData = {
            ...invitation,
            date: invitation.mydate ? invitation.mydate.toISOString().split('T')[0] : '',
            list: listOfGifts,
            childId: childId,
            summary: summary
        };

        try {
            // Create a new invitation document
            const invitationRef = await addDoc(collection(firestore, 'invitations'), invitationData);

            // Associate the invitation with the friends
            for (const friendId of friends) {
                const childRef = doc(firestore, 'children', friendId);
                await updateDoc(childRef, {
                    invitations: arrayUnion(invitationRef.id) // Store invitation ID in child document
                });
            }
            
            // Navigate to the invitation page with invitationId
            navigate(`/invitation/${invitationRef.id}`);
        } catch (error) {
            console.error('Error sending invitations:', error);
        }
    };

    return (
        <div className="invitation-modal">
            <div className="invitation-modal-content">
                <div className="invitation-modal-header">
                    <h2>Invitation for {childName}</h2>
                    <button className="close-btn" onClick={() =>window.location.reload()}>X</button>
                </div>
                <div className="invitation-modal-body">
                    <form onSubmit={handleSubmit}>
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
                            className='date'
                            style={{padding:"10px", border:"2px solid grey", "borderRadius":"10px"}}
                                type="time"
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
                        <div>
                            <button type="submit">Share Invitation</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InvitationForm;
