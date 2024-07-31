import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Our Store</h1>
      <Link to="/products">See Our Products</Link>
    </div>
  );
}

export default Home;
