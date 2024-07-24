import React, { useState } from "react";
import "../../styles/childList.css";

const ChildList = ({ children, setSelectedChild }) => {
  const [activeChild, setActiveChild] = useState(null);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Check for invalid date
    if (isNaN(birthDate.getTime())) {
      console.error("Invalid Date:", dob);
      return "Invalid Date";
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative days or months
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0) {
      return `${years} years`;
    } else if (months > 0) {
      return `${months} months`;
    } else if (days >= 0) {
      return `${days} days`;
    } else {
      return "Below 1 day";
    }
  };

  const handleChildClick = (child) => {
    setSelectedChild(child);
    setActiveChild(child);
  };

  return (
    <div className="child-list-container checking">
      <h2>Children List</h2>
      <div className="child-list">
        <div className="child-list-headings">
          <div>
            <h4>Name</h4>
          </div>
          <div>
            <h4>Age</h4>
          </div>
          <div>
            <h4>Date of Birth</h4>
          </div>
        </div>
        {children.map((child, index) => (
          <div
            key={index}
            className={`child-list-item ${
              activeChild === child ? "active" : ""
            }`}
            onClick={() => handleChildClick(child)}
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
