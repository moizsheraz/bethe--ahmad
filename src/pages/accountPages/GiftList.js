// GiftList.js
import React, { useState, useEffect } from 'react';
import '../../styles/GiftList.css'; 
import { firestore } from '../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const GiftList = ({ gifts, deleteGift, setEditingGift, childName, isSuggested, isAdded, addLikedGift }) => {
  console.log('GiftList', gifts);
  const [likedProducts, setLikedProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const userInfo = JSON.parse(localStorage.getItem('user-info'));
      if (userInfo) {
        const userDocRef = doc(firestore, 'users', userInfo.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const likedProductIds = userDoc.data().likedProducts || [];
          const updatedProducts = gifts.map(gift =>
            likedProductIds.includes(gift.id) ? { ...gift, isLiked: true } : { ...gift, isLiked: false }
          );
          setProducts(updatedProducts);
          setLikedProducts(updatedProducts.filter(product => product.isLiked));
        } else {
          setProducts(gifts.map(gift => ({ ...gift, isLiked: false })));
        }
      }
    };

    fetchProducts();
  }, [gifts]);

  const toggleLike = async (id) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, isLiked: !product.isLiked } : product
    );
    setProducts(updatedProducts);

    const likedProduct = updatedProducts.find(product => product.id === id);

    let updatedLikedProducts;
    if (likedProduct.isLiked) {
      updatedLikedProducts = [...likedProducts, likedProduct];
      setSnackbarMessage(`You have liked ${likedProduct.name}`);
      if (addLikedGift) {
        addLikedGift(likedProduct);
      }
    } else {
      updatedLikedProducts = likedProducts.filter(product => product.id !== id);
      setSnackbarMessage(`You have unliked ${likedProduct.name}`);
    }
    setLikedProducts(updatedLikedProducts);
    setSnackbarOpen(true);

    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    if (userInfo) {
      const userDocRef = doc(firestore, 'users', userInfo.uid);
      const likedProductIds = updatedLikedProducts.map(product => product.id);

      try {
        await updateDoc(userDocRef, {
          likedProducts: likedProductIds
        });
        console.log('Liked products updated successfully');
      } catch (error) {
        console.error('Error updating liked products: ', error);
      }
    }
  };

  return (
    <div className="gift-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} className="product-image" alt={product.name} />
          <h5 className="product-name">{product.name}</h5>
          <p className="price">{product.price}$</p>
          <p className="product-description">{product.description}</p>
          {!isAdded && (  
            <button onClick={() => toggleLike(product.id)} id="icon-button">
              {product.isLiked ? '❤️' : '🤍'}
            </button>
          )}
          {!isSuggested && (
            <div className="icon-container">
              <button id="icon-button" onClick={() => deleteGift(childName, product.id)}>🗑️</button>
            </div>
          )}
        </div>
      ))}
      {snackbarOpen && <div className="snackbar">{snackbarMessage}</div>}
    </div>
  );
};

export default GiftList;
