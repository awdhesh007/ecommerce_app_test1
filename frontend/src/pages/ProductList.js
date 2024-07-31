import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Optional: Import CSS for styling
import { useCart } from '../context/CartContext'; // Import useCart hook

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addItem } = useCart(); // Get the addItem function from CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addItem(product);
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <Link to={`/products/${product._id}`} className="details-button">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
