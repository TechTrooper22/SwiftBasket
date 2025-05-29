import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  
  const [errors, setErrors] = useState({});
  
  // Calculate order summary
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = 0; // No discount in checkout
  const deliveryCharge = subtotal > 500 ? 0 : 40; // Free delivery above ₹500
  const total = subtotal - discount + deliveryCharge;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would submit the order to a backend
      // For now, we'll just simulate a successful order
      setTimeout(() => {
        clearCart();
        navigate('/order-success');
      }, 1500);
    }
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="checkout-page container">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-content">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Shipping Address</h2>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
              ></textarea>
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={errors.state ? 'error' : ''}
                />
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={errors.pincode ? 'error' : ''}
                />
                {errors.pincode && <span className="error-text">{errors.pincode}</span>}
              </div>
            </div>
            
            <h2>Payment Method</h2>
            
            <div className="payment-methods">
              <div className="payment-method">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
              
              <div className="payment-method">
                <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                />
                <label htmlFor="card">Credit/Debit Card</label>
              </div>
              
              <div className="payment-method">
                <input
                  type="radio"
                  id="upi"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                />
                <label htmlFor="upi">UPI</label>
              </div>
              
              <div className="payment-method">
                <input
                  type="radio"
                  id="netbanking"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === 'netbanking'}
                  onChange={handleChange}
                />
                <label htmlFor="netbanking">Net Banking</label>
              </div>
            </div>
            
            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {cartItems.map(item => (
              <div className="order-item" key={item._id}>
                <div className="order-item-image">
                  <img src={item.imageUrl} alt={item.name} />
                  <span className="order-item-quantity">{item.quantity}</span>
                </div>
                
                <div className="order-item-details">
                  <h3 className="order-item-name">{item.name}</h3>
                  <p className="order-item-seller">Seller: {item.seller}</p>
                </div>
                
                <div className="order-item-price">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-price-details">
            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="price-row">
              <span>Delivery Charges</span>
              <span>
                {deliveryCharge === 0 ? (
                  <span className="free">FREE</span>
                ) : (
                  `₹${deliveryCharge}`
                )}
              </span>
            </div>
            
            <div className="price-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="delivery-info">
            <i className="fas fa-truck"></i>
            <p>Estimated delivery: <strong>3-5 business days</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;