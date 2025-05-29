import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import "./Header.css";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userDropdownRef = useRef(null);
  const moreDropdownRef = useRef(null);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
    setShowMoreDropdown(false);
  };

  const toggleMoreDropdown = () => {
    setShowMoreDropdown(!showMoreDropdown);
    setShowUserDropdown(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target)
      ) {
        setShowMoreDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>

          <div>
            <Link to="/" className="logo-class">
              <img className="logo-img" src="/favicon.png" alt="SwiftBasket" />
              <h2 className="logo-name">SwiftBasket</h2>
            </Link>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <nav className={`main-nav ${isMobileMenuOpen ? "active" : ""}`}>
            <div className="nav-close-mobile" onClick={toggleMobileMenu}>
              <i className="fas fa-times"></i>
            </div>

            <div className="nav-item user-item" ref={userDropdownRef}>
              {currentUser ? (
                <>
                  <button className="nav-button" onClick={toggleUserDropdown}>
                    <i className="fas fa-user"></i>
                    <span>{currentUser.name || "Account"}</span>
                  </button>
                  {showUserDropdown && (
                    <div className="dropdown-menu">
                      <Link to="/profile">My Profile</Link>
                      <Link to="/profile/orders">Orders</Link>
                      <Link to="/profile/wishlist">Wishlist</Link>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login" className="nav-button">
                  <i className="fas fa-user"></i>
                  <span>Login</span>
                </Link>
              )}
            </div>

            <div className="nav-item more-item" ref={moreDropdownRef}>
              <button className="nav-button" onClick={toggleMoreDropdown}>
                <i className="fas fa-ellipsis-v"></i>
                <span>More</span>
              </button>
              {showMoreDropdown && (
                <div className="dropdown-menu">
                  <Link to="/notification-preferences">
                    Notification Preferences
                  </Link>
                  <Link to="/customer-care">24x7 Customer Care</Link>
                  <Link to="/advertise">Advertise</Link>
                  <Link to="/download-app">Download App</Link>
                </div>
              )}
            </div>

            <Link
              to="/cart"
              style={{ backgroundColor: "#2874F0", padding: "0px" }}
              className="nav-item cart-item"
            >
              <div className="nav-button">
                <div className="cart-icon">
                  <i
                    style={{ color: "white" }}
                    className="fas fa-shopping-cart"
                  ></i>
                  {cartItemCount > 0 && (
                    <span
                      className="cart-count"
                      style={{
                        color: "white",
                        fontSize: "12px",
                        backgroundColor: "black",
                        padding: "8px",
                      }}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span style={{ color: "white", fontSize: "20px" }}>Cart</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
