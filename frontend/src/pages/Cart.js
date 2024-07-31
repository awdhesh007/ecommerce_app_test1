import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css'; // Optional: Import CSS for styling

function Cart() {
  const { cartItems, removeItem } = useCart();

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map(item => (
            <li key={item._id} className="cart-item">
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <h2>{item.product.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.product.price}</p>
                <button onClick={() => removeItem(item._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="cart-actions">
          <Link to="/checkout" className="checkout-button">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
