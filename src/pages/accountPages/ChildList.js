import React from 'react';
import '../../styles/childList.css';

const ChildList = ({ children, setSelectedChild }) => {
  // Function to calculate age from Date of Birth
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Check for invalid date
    if (isNaN(birthDate.getTime())) {
      console.error("Invalid Date:", dob);
      return "Invalid Date";
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Return "Below 1" if the age is less than 1
    return age < 1 ? "Below 1" : age;
  };

  return (
    <div className="child-list-container  checking">
      <h2>Children List</h2>
      <div className="child-list">
        <div className="child-list-headings">
          <div><h4>Name</h4></div>
          <div><h4>Age</h4></div>
          <div><h4>Date of Birth</h4></div>
        </div>
        {children.map((child, index) => (
          <div 
            key={index} 
            className="child-list-item" 
            onClick={() => setSelectedChild(child)}
          >
            <div className="child-name">{child.name}</div>
            <div className="child-age">{calculateAge(child.dob)}</div>
            <div className="child-dob">{child.dob}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildList;
