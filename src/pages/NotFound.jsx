import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page container">
      <div className="not-found-content">
        <div className="not-found-image">
          <img src="https://i.ibb.co/Qj1StVY/404-image.png" alt="Page Not Found" />
        </div>
        
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;