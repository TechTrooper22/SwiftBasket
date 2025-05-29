import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock order data
  const orders = [
    {
      id: 'OD123456789',
      date: '15 Jun, 2023',
      total: 12999,
      status: 'Delivered',
      items: [
        {
          name: 'Boat Rockerz 550 Bluetooth Headphone',
          price: 1799,
          quantity: 1,
          image: 'https://i.ibb.co/Qm9Nh9F/boat-headphones.jpg'
        }
      ]
    },
    {
      id: 'OD987654321',
      date: '10 May, 2023',
      total: 59999,
      status: 'Delivered',
      items: [
        {
          name: 'Apple iPhone 13 (128GB) - Midnight',
          price: 59999,
          quantity: 1,
          image: 'https://i.ibb.co/5jnXDv7/iphone13.jpg'
        }
      ]
    }
  ];
  
  // Mock address data
  const addresses = [
    {
      id: 1,
      name: 'John Doe',
      phone: '9876543210',
      address: '123, ABC Apartments, XYZ Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    {
      id: 2,
      name: 'John Doe',
      phone: '9876543210',
      address: '456, PQR Villas, MNO Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      isDefault: false
    }
  ];
  
  return (
    <div className="profile-page container">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-user-info">
            <div className="profile-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="profile-user-details">
              <h3>Hello,</h3>
              <p>{currentUser.name}</p>
            </div>
          </div>
          
          <div className="profile-tabs">
            <button 
              className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user"></i>
              <span>My Profile</span>
            </button>
            
            <button 
              className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <i className="fas fa-box"></i>
              <span>My Orders</span>
            </button>
            
            <button 
              className={`profile-tab ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <i className="fas fa-map-marker-alt"></i>
              <span>My Addresses</span>
            </button>
            
            <button 
              className={`profile-tab ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <i className="fas fa-heart"></i>
              <span>My Wishlist</span>
            </button>
            
            <button 
              className="profile-tab"
              onClick={logout}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-details">
              <h2>Personal Information</h2>
              
              <form className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" defaultValue={currentUser.name} />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" defaultValue={currentUser.email} readOnly />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" defaultValue="9876543210" />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" defaultValue="">
                      <option value="" disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </form>
              
              <div className="profile-section">
                <h2>Email Preferences</h2>
                
                <div className="preference-item">
                  <div>
                    <h3>Order Updates</h3>
                    <p>Receive updates about your orders</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="preference-item">
                  <div>
                    <h3>Promotions and Offers</h3>
                    <p>Receive information about promotions and offers</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                
                <div className="preference-item">
                  <div>
                    <h3>Product Recommendations</h3>
                    <p>Receive personalized product recommendations</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="orders-section">
              <h2>My Orders</h2>
              
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map(order => (
                    <div className="order-card" key={order.id}>
                      <div className="order-header">
                        <div>
                          <h3>Order #{order.id}</h3>
                          <p>Placed on {order.date}</p>
                        </div>
                        <div className="order-status">
                          <span className={`status-badge ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="order-items-list">
                        {order.items.map((item, index) => (
                          <div className="order-item" key={index}>
                            <div className="order-item-image">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <div className="order-item-details">
                              <h4>{item.name}</h4>
                              <p>Quantity: {item.quantity}</p>
                              <p>₹{item.price.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-footer">
                        <div className="order-total">
                          <span>Total:</span>
                          <span>₹{order.total.toLocaleString()}</span>
                        </div>
                        <div className="order-actions">
                          <button className="btn-view-details">View Details</button>
                          <button className="btn-track-order">Track Order</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-box-open"></i>
                  <p>You haven't placed any orders yet.</p>
                  <button className="btn-shop-now">Shop Now</button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'addresses' && (
            <div className="addresses-section">
              <h2>My Addresses</h2>
              
              <div className="addresses-list">
                {addresses.map(address => (
                  <div className={`address-card ${address.isDefault ? 'default' : ''}`} key={address.id}>
                    {address.isDefault && <span className="default-badge">Default</span>}
                    
                    <h3>{address.name}</h3>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                    <p>Phone: {address.phone}</p>
                    
                    <div className="address-actions">
                      <button className="btn-edit-address">Edit</button>
                      <button className="btn-delete-address">Delete</button>
                      {!address.isDefault && (
                        <button className="btn-set-default">Set as Default</button>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="add-address-card">
                  <i className="fas fa-plus"></i>
                  <p>Add a new address</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'wishlist' && (
            <div className="wishlist-section">
              <h2>My Wishlist</h2>
              
              <div className="empty-state">
                <i className="fas fa-heart"></i>
                <p>Your wishlist is empty.</p>
                <button className="btn-shop-now">Add Items</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;