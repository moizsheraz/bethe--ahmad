import React from 'react';
import './styles/Product.css';

export default function ProductCard({ id, name, description, image,price, isLiked, onLikeToggle }) {
  return (
    <div className="product-card" key={id}>
      <img src={image} alt={name} className="product-image" />
      <h2 className="product-name">{name}</h2>
      <p className="product-description">{description}</p>
      <p className="price">{price} $</p>
      <div className="icon-container">
        <button onClick={onLikeToggle} id="icon-button">
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}
