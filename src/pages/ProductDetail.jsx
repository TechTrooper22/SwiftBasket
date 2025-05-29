import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { mockProducts } from '../data/mockData';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    // In a real app, this would fetch data from the backend
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find product with matching ID
        const foundProduct = mockProducts.find(p => p._id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Find related products in the same category
          const related = mockProducts
            .filter(p => p.category === foundProduct.category && p._id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
        } else {
          setError('Product not found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };
    
    fetchProduct();
    
    // Scroll to top when navigating to a new product
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  if (loading) {
    return (
      <div className="product-detail-container container">
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="product-detail-container container">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error || 'Product not found'}</p>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }
  
  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  
  return (
    <div className="product-detail-container container">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <i className="fas fa-chevron-right"></i>
        <Link to={`/?category=${product.category.toLowerCase()}`}>{product.category}</Link>
        <i className="fas fa-chevron-right"></i>
        <span>{product.name}</span>
      </div>
      
      <div className="product-detail">
        <div className="product-detail-left">
          <div className="product-image-main">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          
          <div className="product-actions">
            <button className="btn btn-accent" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i> ADD TO CART
            </button>
            <button className="btn btn-primary">
              <i className="fas fa-bolt"></i> BUY NOW
            </button>
          </div>
        </div>
        
        <div className="product-detail-right">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating-review">
            <div className="rating">
              <span className="rating-value">{product.rating}</span>
              <i className="fas fa-star"></i>
            </div>
            <span className="rating-count">{product.ratingCount} Ratings & Reviews</span>
            
            {product.assured && (
              <div className="assured-badge">
                <i className="fas fa-check-circle"></i> Assured
              </div>
            )}
          </div>
          
          <div className="product-pricing">
            <span className="product-price">₹{product.price.toLocaleString()}</span>
            
            {product.originalPrice > product.price && (
              <>
                <span className="product-original-price">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="product-discount">{discountPercentage}% off</span>
              </>
            )}
          </div>
          
          {product.offers && product.offers.length > 0 && (
            <div className="product-offers">
              <h3>Available offers</h3>
              <ul>
                {product.offers.map((offer, index) => (
                  <li key={index}>
                    <i className="fas fa-tag"></i>
                    <div dangerouslySetInnerHTML={{ __html: offer }} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="product-delivery">
            <div className="delivery-info">
              <p>
                <span className="info-label">Delivery</span>
                <span className="delivery-status">
                  <i className="fas fa-truck"></i> Delivery by Tomorrow
                </span>
              </p>
              {product.freeDelivery && <p className="free-delivery">Free delivery</p>}
            </div>
          </div>
          
          <div className="product-quantity">
            <span className="quantity-label">Quantity:</span>
            <div className="quantity-controls">
              <button className="quantity-btn" onClick={decrementQuantity}>-</button>
              <input 
                type="number" 
                min="1" 
                max="10" 
                value={quantity} 
                onChange={handleQuantityChange} 
              />
              <button className="quantity-btn" onClick={incrementQuantity}>+</button>
            </div>
          </div>
          
          <div className="product-specs">
            <h3>Highlights</h3>
            <ul>
              {product.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
          
          <div className="seller-info">
            <span className="info-label">Seller</span>
            <span className="seller-name">{product.seller}</span>
            {product.sellerRating && (
              <div className="seller-rating">
                <span>{product.sellerRating}</span>
                <i className="fas fa-star"></i>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="product-tabs">
        <div className="tab-buttons">
          <button 
            className={activeTab === 'description' ? 'active' : ''} 
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={activeTab === 'specifications' ? 'active' : ''} 
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''} 
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="tab-description">
              <p>{product.description}</p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="tab-specifications">
              <table>
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index}>
                      <td>{spec.name}</td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="tab-reviews">
              <div className="reviews-summary">
                <div className="review-average">
                  <span className="big-rating">{product.rating}</span>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <i 
                        key={star} 
                        className={`fa${star <= Math.round(product.rating) ? 's' : 'r'} fa-star`}
                      ></i>
                    ))}
                  </div>
                  <p>{product.ratingCount} ratings</p>
                </div>
                
                <div className="rating-breakdown">
                  {[5, 4, 3, 2, 1].map(stars => {
                    // For mock data, let's generate random percentages
                    const percentage = stars === 5 ? 62 : 
                                      stars === 4 ? 20 : 
                                      stars === 3 ? 10 : 
                                      stars === 2 ? 5 : 3;
                    
                    return (
                      <div className="rating-bar" key={stars}>
                        <span>{stars} ★</span>
                        <div className="progress-bar">
                          <div className="progress" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span>{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="customer-reviews">
                <h3>Top Reviews</h3>
                
                {/* Mock reviews */}
                {[
                  {
                    id: 1,
                    name: 'Rahul M.',
                    rating: 5,
                    date: '15 Jun, 2023',
                    title: 'Excellent product',
                    comment: 'Great quality product. Fast delivery and exactly as described. Very satisfied with the purchase.'
                  },
                  {
                    id: 2,
                    name: 'Priya S.',
                    rating: 4,
                    date: '2 Jul, 2023',
                    title: 'Good value for money',
                    comment: 'Does the job well. Could be slightly better in terms of build quality but at this price point, it\'s a good deal.'
                  },
                  {
                    id: 3,
                    name: 'Amit K.',
                    rating: 3,
                    date: '10 Aug, 2023',
                    title: 'Average product',
                    comment: 'It\'s okay. Not bad but not great either. Expected better performance for this price.'
                  }
                ].map(review => (
                  <div className="review-item" key={review.id}>
                    <div className="review-header">
                      <div className="reviewer-info">
                        <span className="reviewer-name">{review.name}</span>
                        <div className="reviewer-rating">
                          <span className="rating-value">{review.rating}</span>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <h4 className="review-title">{review.title}</h4>
                    <p className="review-comment">{review.comment}</p>
                    <div className="review-actions">
                      <button>
                        <i className="far fa-thumbs-up"></i> Helpful
                      </button>
                      <button>
                        <i className="far fa-thumbs-down"></i> Not Helpful
                      </button>
                      <button>
                        <i className="far fa-flag"></i> Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h2>Similar Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map(relatedProduct => (
              <div className="related-product" key={relatedProduct._id}>
                <Link to={`/product/${relatedProduct._id}`}>
                  <div className="related-product-image">
                    <img src={relatedProduct.imageUrl} alt={relatedProduct.name} />
                  </div>
                  <h3 className="related-product-name">{relatedProduct.name}</h3>
                  <div className="related-product-price">₹{relatedProduct.price.toLocaleString()}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;