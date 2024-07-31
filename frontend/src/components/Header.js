import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useCart();

  const cartItemCount = cartItems.length;

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">My E-Commerce</Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItemCount})</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
