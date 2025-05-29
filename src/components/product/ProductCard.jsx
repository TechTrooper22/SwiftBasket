import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          
          <div className="product-rating">
            <div className="rating-stars">
              <span className="rating-value">{product.rating}</span>
              <i className="fas fa-star"></i>
            </div>
            <span className="rating-count">({product.ratingCount})</span>
          </div>
          
          <div className="product-prices">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                <span className="discount-percentage">{discountPercentage}% off</span>
              </>
            )}
          </div>
          
          {product.freeDelivery && <p className="free-delivery">Free Delivery</p>}
          
          {product.assured && (
            <div className="assured-badge">
              <i className="fas fa-check-circle"></i> Assured
            </div>
          )}
        </div>
      </Link>
      
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        <i className="fas fa-shopping-cart"></i> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;