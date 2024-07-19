import React from 'react';
import '../../styles/childList.css';

const ChildList = ({ children, setSelectedChild }) => {
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
            <div className="child-age">{child.age}</div>
            <div className="child-dob">{child.dob}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildList;
