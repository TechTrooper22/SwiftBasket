import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to home
  const redirectPath = location.state?.from || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate(redirectPath);
    } catch (err) {
      setError('Failed to log in. ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <h2>Login</h2>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
          <img src="https://i.ibb.co/Qj1StVY/login-image.png" alt="Login" />
        </div>
        
        <div className="login-right">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <p className="login-terms">
              By continuing, you agree to SwiftBasket's <Link to="/terms">Terms of Use</Link> and <Link to="/privacy">Privacy Policy</Link>.
            </p>
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="login-divider">
              <span>OR</span>
            </div>
            
            <button type="button" className="otp-btn">
              Request OTP
            </button>
            
            <p className="create-account-link">
              New to SwiftBasket? <Link to="/register">Create an account</Link>
            </p>
          </form>
          
          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Email: user@example.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;