import React, { useState } from 'react';

const AddChildForm = ({ addChild, setAddingChild }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const questions = [
    {
      question: "What kinds of games does he like to play the most?",
      answer: '',
      options: [
        "Board games",
        "Outdoor games",
        "Technology games (such as game consoles or computer games)",
        "Puzzle building and challenge tests"
      ]
    },
    {
      question: "What are your child's favorite movies or series?",
      answer: '',
      options: ["Animated movies", "Action series", "Dramas", "Comedies"]
    },
    {
      question: "How does he like to spend time during vacations or on weekends?",
      answer: '',
      options: [
        "Outdoor activities like hiking or sports",
        "Arts and crafts",
        "Indoor games and activities",
        "Watching movies or TV series at home"
      ]
    },
    {
      question: "What types of books does he like to read?",
      answer: '',
      options: [
        "Fantasy",
        "Science fiction",
        "Thriller and adventure books",
        "Educational and mentoring books"
      ]
    },
    {
      question: "Is there something important for us to know?",
      answer: '',
      options: [] 
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addChild({ name, dob, questions });
    setAddingChild(false);
  };

  return (
    <div className="add-child-form">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <h2>Add Child</h2>
          <input
            type="text"
            placeholder="Child's Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <h2>Date of Birth</h2>
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="btns">
          <button type="submit">Add Child</button>
          <button type="button" onClick={() => setAddingChild(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddChildForm;
