import React, { useState } from 'react';
import '../../styles/addChild.css'

const EditGiftForm = ({ gift, updateGift, setEditingGift, childName }) => {
  const [formData, setFormData] = useState(gift);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGift(childName, formData);
    setEditingGift(null);
  };

  return (
    <div className="add-child-form">
      <h2>Edit Gift</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Gift Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input 
            type="text" 
            value={formData.price} 
            onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="text" 
            value={formData.image} 
            onChange={(e) => setFormData({ ...formData, image: e.target.value })} 
            required
          />
        </div>
        <div className="btns">
        <button type="submit">Save Changes</button>
        <button type="button"onClick={() => setEditingGift(null)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditGiftForm;