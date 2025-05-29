import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  // Generate a random order ID
  const orderId = `OD${Math.floor(100000000 + Math.random() * 900000000)}`;
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="order-success-page container">
      <div className="order-success-container">
        <div className="order-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h1>Order Placed Successfully!</h1>
        
        <p className="order-id">
          Order ID: <span>{orderId}</span>
        </p>
        
        <p className="thank-you-message">
          Thank you for shopping with SwiftBasket. We've received your order and will begin processing it soon.
        </p>
        
        <div className="order-details">
          <div className="detail-item">
            <i className="fas fa-envelope"></i>
            <div>
              <h3>Order Confirmation</h3>
              <p>We've sent an order confirmation email with details of your purchase.</p>
            </div>
          </div>
          
          <div className="detail-item">
            <i className="fas fa-truck"></i>
            <div>
              <h3>Delivery Information</h3>
              <p>Your order will be delivered within 3-5 business days.</p>
            </div>
          </div>
          
          <div className="detail-item">
            <i className="fas fa-credit-card"></i>
            <div>
              <h3>Payment</h3>
              <p>Your payment has been processed successfully.</p>
            </div>
          </div>
        </div>
        
        <div className="order-success-actions">
          <Link to="/" className="btn-continue-shopping">
            Continue Shopping
          </Link>
          
          <Link to="/profile/orders" className="btn-view-orders">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;