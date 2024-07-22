import React, { useState } from 'react';

const AddFriendForm = ({ children, addFriend, setAddingFriend, childName }) => {
  const [selectedFriend, setSelectedFriend] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFriend) {
      addFriend(childName, selectedFriend);
      setSelectedFriend('');
    }
  };

  return (
    <div className="add-friend-form">
      <h2>Add Friend for {childName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="friend-select">Select a Friend:</label>
        <select
          id="friend-select"
          value={selectedFriend}
          onChange={(e) => setSelectedFriend(e.target.value)}
        >
          <option value="">--Select a Friend--</option>
          {children
            .filter((child) => child.name !== childName)
            .map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
        </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn">Add Friend</button>
          <button type="button" className="btn" onClick={() => setAddingFriend(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddFriendForm;
