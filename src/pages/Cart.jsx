import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0; // 10% discount for mock coupon
  const deliveryCharge = subtotal > 500 ? 0 : 40; // Free delivery above ₹500
  const total = subtotal - discount + deliveryCharge;
  
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      updateCartItemQuantity(item._id, newQuantity);
    }
  };
  
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };
  
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'swift10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponApplied(false);
      setCouponError('Invalid coupon code');
    }
  };
  
  const proceedToCheckout = () => {
    navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="cart-page container">
        <div className="empty-cart">
          <i className="fas fa-shopping-cart"></i>
          <h2>Your cart is empty!</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page container">
      <h1 className="cart-title">Shopping Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <div className="cart-item-image">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-seller">Seller: {item.seller}</p>
                
                <div className="cart-item-price">
                  <span className="current-price">₹{item.price.toLocaleString()}</span>
                  {item.originalPrice > item.price && (
                    <>
                      <span className="original-price">₹{item.originalPrice.toLocaleString()}</span>
                      <span className="discount-percentage">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                      </span>
                    </>
                  )}
                </div>
                
                {item.freeDelivery && <p className="free-delivery">Free Delivery</p>}
                
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      disabled={item.quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                  
                  <button className="remove-btn" onClick={() => handleRemoveItem(item._id)}>
                    REMOVE
                  </button>
                </div>
              </div>
              
              <div className="cart-item-price-total">
                ₹{(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
          
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
        
        <div className="cart-summary">
          <h2>PRICE DETAILS</h2>
          
          <div className="summary-row">
            <span>Price ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          
          {discount > 0 && (
            <div className="summary-row discount">
              <span>Discount</span>
              <span>- ₹{discount.toLocaleString()}</span>
            </div>
          )}
          
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span>
              {deliveryCharge === 0 ? (
                <span className="free">FREE</span>
              ) : (
                `₹${deliveryCharge}`
              )}
            </span>
          </div>
          
          <div className="coupon-section">
            <div className="coupon-input-group">
              <input 
                type="text" 
                placeholder="Enter coupon code" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={applyCoupon}>APPLY</button>
            </div>
            {couponError && <p className="coupon-error">{couponError}</p>}
            {couponApplied && <p className="coupon-success">Coupon SWIFT10 applied successfully!</p>}
            <p className="coupon-hint">Try coupon: SWIFT10</p>
          </div>
          
          <div className="summary-total">
            <span>Total Amount</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          
          {discount > 0 && (
            <p className="saved-amount">You will save ₹{discount.toLocaleString()} on this order</p>
          )}
          
          <button className="checkout-btn" onClick={proceedToCheckout}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;