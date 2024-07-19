import React from 'react';
import '../../styles/GiftList.css'; 

const GiftList = ({ gifts, deleteGift, setEditingGift, childName }) => {
  return (
    <div className="gift-list">
      {gifts?.map(gift => (
        <div key={gift.id} className="product-card">
          <img src={gift.image} className="product-image" alt={gift.name} />
          <h5 className="product-name">{gift.name}</h5>
          <p className="price">{gift.price}$</p>
          <p className="product-description">{gift.description}</p>
          <div className="icon-container">
            <button id="icon-button" onClick={() => setEditingGift(gift)}>✏️</button>
            <button id="icon-button" onClick={() => deleteGift(childName, gift.id)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GiftList;
 