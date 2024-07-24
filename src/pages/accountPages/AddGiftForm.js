import React, { useState } from 'react';
import '../../styles/addChild.css';

const AddGiftForm = ({ addGift, setAddingGift, childName }) => {
  const [gift, setGift] = useState({
    id: Date.now(),
    image: '', 
    name: '',
    price: '',
    websiteLink: '', 
    description: ''
  });
  const [imagePreview, setImagePreview] = useState("https://img.freepik.com/free-vector/pink-gift-box-present-icon_18591-82305.jpg?t=st=1721828864~exp=1721832464~hmac=632a381f18f0f05ffdf266f54dbd520fbd2fb8e70ffb096d96782b572d4970d1&w=740");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGift({ ...gift, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGift({ ...gift, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const giftWithImage = {
      ...gift,
      image: gift.image || "https://img.freepik.com/free-vector/pink-gift-box-present-icon_18591-82305.jpg?t=st=1721828864~exp=1721832464~hmac=632a381f18f0f05ffdf266f54dbd520fbd2fb8e70ffb096d96782b572d4970d1&w=740"
    };
    addGift(childName, giftWithImage);
  };

  return (
    <div className="add-child-form">
      <h2>Add Gift</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Image (optional)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
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
          <label>Website Link</label>
          <input 
            type="text" 
            name="websiteLink" 
            value={gift.websiteLink} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Description (optional)</label>
          <textarea 
            name="description" 
            value={gift.description} 
            onChange={handleChange} 
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
