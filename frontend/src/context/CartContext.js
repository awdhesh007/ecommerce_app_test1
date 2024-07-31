import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }){
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
