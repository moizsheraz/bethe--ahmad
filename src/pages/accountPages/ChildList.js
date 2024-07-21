import React from 'react';
import '../../styles/childList.css';

const ChildList = ({ children, setSelectedChild }) => {
  // Function to calculate age from Date of Birth
  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();

    // Log dates for debugging
    console.log('DOB Date:', dobDate);
    console.log('Today:', today);

    // Check if the dobDate is valid
    if (isNaN(dobDate.getTime())) {
      console.error('Invalid Date:', dob);
      return 'Invalid Date';
    }

    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div className="child-list-container">
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
