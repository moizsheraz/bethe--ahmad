import React, { useState } from 'react';
import '../../styles/addChild.css'

const AddGiftForm = ({ addGift, setAddingGift, childName }) => {
  const [gift, setGift] = useState({
    id: Date.now(),
    image: '',
    name: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGift({ ...gift, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addGift(childName, gift);
  };

  return (
    <div className="add-child-form">
      <h2>Add Gift</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="text" 
            name="image" 
            value={gift.image} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            name="name" 
            value={gift.name} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input 
            type="text" 
            name="price" 
            value={gift.price} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            value={gift.description} 
            onChange={handleChange} 
            required
          />
        </div>
        <div className="btns">
          <button type="submit" className="btn btn-success">Add Gift</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAddingGift(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddGiftForm;
