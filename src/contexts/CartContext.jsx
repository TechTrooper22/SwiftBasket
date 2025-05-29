import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItemIndex = prevItems.findIndex(item => item._id === product._id);
      
      if (existingItemIndex !== -1) {
        // If the item exists, update its quantity
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: Math.min(newQuantity, 10) // Limit to max 10 items
        };
        return updatedItems;
      } else {
        // If the item doesn't exist, add it to the cart
        return [...prevItems, {
          ...product,
          quantity
        }];
      }
    });
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};