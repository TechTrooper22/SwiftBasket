import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ABOUT</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press</Link></li>
              <li><Link to="/corporate-information">Corporate Information</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>HELP</h3>
            <ul>
              <li><Link to="/payments">Payments</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/cancellation-returns">Cancellation & Returns</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>POLICY</h3>
            <ul>
              <li><Link to="/return-policy">Return Policy</Link></li>
              <li><Link to="/terms-of-use">Terms Of Use</Link></li>
              <li><Link to="/security">Security</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>SOCIAL</h3>
            <ul>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
          
          <div className="footer-section contact-section">
            <h3>Contact Us</h3>
            <address>
              SwiftBasket Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Bengaluru, 560103,<br />
              Karnataka, India
            </address>
            <p>Email: <a href="mailto:support@swiftbasket.com">support@swiftbasket.com</a></p>
            <p>Phone: <a href="tel:+918000000000">+91 8000000000</a></p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="payment-methods">
            <p>We Accept:</p>
            <div className="payment-icons">
              <i className="fab fa-cc-visa"></i>
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-amex"></i>
              <i className="fab fa-cc-paypal"></i>
            </div>
          </div>
          <p className="copyright">&copy; {new Date().getFullYear()} SwiftBasket. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;