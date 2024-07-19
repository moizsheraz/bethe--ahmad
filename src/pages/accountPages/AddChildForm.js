import React, { useState } from 'react';
import '../../styles/addChild.css'

const AddChildForm = ({ addChild, setAddingChild }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== '' && age.trim() !== '' && dob.trim() !== '') {
      addChild({
        name,
        age,
        dob,
        questions: [
          { question: 'What is the age of the child?', answer: '' },
          { question: 'What kinds of games does he like to play the most?', answer: '' },
          { question: "What are your child's favorite movies or series?", answer: '' },
          { question: 'How does he like to spend time during vacations or on weekends?', answer: '' },
          { question: 'What types of books does he like to read?', answer: '' },
          { question: 'Is there something important for us to know?', answer: '' }
        ],
        gifts: [
          {
            id: 1,
            image: 'https://toysrus.co.il/media/catalog/product/cache/55a044f927b05bedf296cf15120d7cf4/6/9/693677_1.jpg',
            name: 'Hermiz',
            price: '80',
            description: 'box game'
          },
          {
            id: 2,
            image: 'https://toysrus.co.il/media/catalog/product/cache/55a044f927b05bedf296cf15120d7cf4/1/7/17450_1.jpg',
            name: 'monopoly',
            price: '99',
            description: 'Social Games'
          },
          {
            id: 3,
            image: 'https://itsplaytime.co.il/wp-content/uploads/2020/03/IMG_4758.jpg',
            name: 'Lego',
            price: '30',
            description: 'Lego Games'
          },
          {
            id: 4,
            image: 'https://www.kodkod.co.il/images/itempics/1341.jpg',
            name: 'Talesman',
            price: '120',
            description: 'Social Games'
          },
          {
            id: 5,
            image: 'https://th.bing.com/th/id/OIP.00_yuNxck1mqMzXxnQhTaQHaHa?rs=1&pid=ImgDetMain',
            name: 'Art',
            price: '80',
            description: 'Art Games'
          }
        ]
      });
      setAddingChild(false);
    }
  };

  return (
    <div className="add-child-form">
      <h2>Add Child</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Child Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="btns">
        <button type="submit" >Add Child</button>
        <button type="button"  onClick={() => setAddingChild(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddChildForm;
