import React, { useEffect, useState } from 'react';
import productData from './assets/products.json';
import './styles/Products.css';
import ProductCard from './Product';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    setProducts(productData);
  }, []);

  const [likedProducts, setLikedProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const toggleLike = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, isLiked: !product.isLiked } : product
    );
    setProducts(updatedProducts);

    const likedProduct = updatedProducts.find(product => product.id === id);

    if (likedProduct.isLiked) {
      setLikedProducts([...likedProducts, likedProduct]);
      setSnackbarMessage(`You have liked ${likedProduct.name}`);
    } else {
      setLikedProducts(likedProducts.filter(product => product.id !== id));
      setSnackbarMessage(`You have unliked ${likedProduct.name}`);
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceFilter = (event) => {
    setPriceFilter(event.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter ? product.price <= priceFilter : true;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="products">
      <div className="filter-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select className="price-filter" value={priceFilter} onChange={handlePriceFilter}>
          <option value="">Filter by price</option>
          <option value="20">Up to $20</option>
          <option value="30">Up to $30</option>
          <option value="60">Up to $60</option>
        </select>
      </div>
      <div className="product-cards">
        <h1>מוצרים נבחרים</h1>
        <div className="grid-container">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
              isLiked={product.isLiked}
              onLikeToggle={() => toggleLike(product.id)}
            />
          ))}
        </div>
      </div>
      <div className={`snackbar ${snackbarOpen ? 'show' : ''}`}>
        <div className="snackbar-content">
          {snackbarMessage}
          <button id="close-btn" onClick={handleCloseSnackbar}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;