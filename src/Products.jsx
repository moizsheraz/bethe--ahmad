import React, { useEffect, useState } from "react";
import productData from "./assets/products.json";
import "./styles/Products.css";
import ProductCard from "./Product";
import { firestore } from "./firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [likedProducts, setLikedProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(productData);

      const userInfo = JSON.parse(localStorage.getItem("user-info"));
      if (userInfo) {
        const userDocRef = doc(firestore, "users", userInfo.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const likedProductIds = userDoc.data().likedProducts || [];
          const updatedProducts = productData.map((product) =>
            likedProductIds.includes(product.id)
              ? { ...product, isLiked: true }
              : product
          );
          setProducts(updatedProducts);
          setLikedProducts(
            updatedProducts.filter((product) =>
              likedProductIds.includes(product.id)
            )
          );
        }
      }
    };

    fetchProducts();
  }, []);

  const toggleLike = async (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, isLiked: !product.isLiked } : product
    );
    setProducts(updatedProducts);

    const likedProduct = updatedProducts.find((product) => product.id === id);

    let updatedLikedProducts;
    if (likedProduct.isLiked) {
      updatedLikedProducts = [...likedProducts, likedProduct];
      setSnackbarMessage(`You have liked ${likedProduct.name}`);
    } else {
      updatedLikedProducts = likedProducts.filter(
        (product) => product.id !== id
      );
      setSnackbarMessage(`You have unliked ${likedProduct.name}`);
    }
    setLikedProducts(updatedLikedProducts);
    setSnackbarOpen(true);

    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    if (userInfo) {
      const userDocRef = doc(firestore, "users", userInfo.uid);
      const likedProductIds = updatedLikedProducts.map((product) => product.id);

      try {
        await updateDoc(userDocRef, {
          likedProducts: likedProductIds,
        });
        console.log("Liked products updated successfully");
      } catch (error) {
        console.error("Error updating liked products: ", error);
      }
    }
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

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter ? product.price <= priceFilter : true;
    const matchesCategory = categoryFilter
      ? product.category.includes(categoryFilter)
      : true;
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <>
      <div className="filter-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="price-filter"
          value={priceFilter}
          onChange={handlePriceFilter}
        >
          <option value="">Filter by price</option>
          <option value="20">Up to $20</option>
          <option value="30">Up to $30</option>
          <option value="60">Up to $60</option>
        </select>
        <select
          className="category-filter price-filter"
          value={categoryFilter}
          onChange={handleCategoryFilter}
        >
          <option value="">Filter by category</option>
          <option value="Dolls">Dolls</option>
          <option value="Games">Games</option>
          <option value="Books">Books</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div className="products">
        <div className="product-cards">
          <h1 style={{ color: "#EBF4F6" }}>מוצרים נבחרים</h1>
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
        <div className={`snackbar ${snackbarOpen ? "show" : ""}`}>
          <div className="snackbar-content">
            {snackbarMessage}
            <button id="close-btn" onClick={handleCloseSnackbar}>
              &times;
            </button>
          </div>
        </div>
        <footer
          style={{
            color: "#EBF4F6",
            backgroundColor: "#088395",
          }}
        >
          <div>&copy; 2024 GiftFlow. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
}

export default Products;
