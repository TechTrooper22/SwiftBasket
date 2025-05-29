import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ 
  title, 
  products, 
  loading, 
  error, 
  categoryFilter = null,
  showFilters = true
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    category: categoryFilter,
    price: null,
    rating: null,
    discount: null
  });
  
  useEffect(() => {
    if (products) {
      let result = [...products];
      
      // Apply category filter
      if (activeFilters.category) {
        result = result.filter(product => product.category === activeFilters.category);
      }
      
      // Apply price filter
      if (activeFilters.price) {
        switch (activeFilters.price) {
          case 'under500':
            result = result.filter(product => product.price < 500);
            break;
          case '500-1000':
            result = result.filter(product => product.price >= 500 && product.price <= 1000);
            break;
          case '1000-5000':
            result = result.filter(product => product.price > 1000 && product.price <= 5000);
            break;
          case 'above5000':
            result = result.filter(product => product.price > 5000);
            break;
          default:
            break;
        }
      }
      
      // Apply rating filter
      if (activeFilters.rating) {
        const ratingValue = parseInt(activeFilters.rating);
        result = result.filter(product => product.rating >= ratingValue);
      }
      
      // Apply discount filter
      if (activeFilters.discount) {
        const discountValue = parseInt(activeFilters.discount);
        result = result.filter(product => {
          const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
          return discount >= discountValue;
        });
      }
      
      setFilteredProducts(result);
    }
  }, [products, activeFilters]);
  
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }));
  };
  
  if (loading) {
    return (
      <div className="product-list-container">
        <div className="product-list-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="product-list-container">
        <div className="product-list-error">
          <i className="fas fa-exclamation-circle"></i>
          <p>Error loading products. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="product-list-container">
      {title && <h2 className="product-list-title">{title}</h2>}
      
      <div className="product-list-content">
        {showFilters && (
          <div className="product-filters">
            <h3>Filters</h3>
            
            <div className="filter-section">
              <h4>Price</h4>
              <div className="filter-options">
                <button 
                  className={activeFilters.price === 'under500' ? 'active' : ''}
                  onClick={() => handleFilterChange('price', 'under500')}
                >
                  Under ₹500
                </button>
                <button 
                  className={activeFilters.price === '500-1000' ? 'active' : ''}
                  onClick={() => handleFilterChange('price', '500-1000')}
                >
                  ₹500 - ₹1,000
                </button>
                <button 
                  className={activeFilters.price === '1000-5000' ? 'active' : ''}
                  onClick={() => handleFilterChange('price', '1000-5000')}
                >
                  ₹1,000 - ₹5,000
                </button>
                <button 
                  className={activeFilters.price === 'above5000' ? 'active' : ''}
                  onClick={() => handleFilterChange('price', 'above5000')}
                >
                  Above ₹5,000
                </button>
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Customer Rating</h4>
              <div className="filter-options">
                {[4, 3, 2, 1].map(rating => (
                  <button 
                    key={rating}
                    className={activeFilters.rating === rating.toString() ? 'active' : ''}
                    onClick={() => handleFilterChange('rating', rating.toString())}
                  >
                    {rating}★ & above
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-section">
              <h4>Discount</h4>
              <div className="filter-options">
                {[10, 20, 30, 40].map(discount => (
                  <button 
                    key={discount}
                    className={activeFilters.discount === discount.toString() ? 'active' : ''}
                    onClick={() => handleFilterChange('discount', discount.toString())}
                  >
                    {discount}% or more
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="clear-filters-btn"
              onClick={() => setActiveFilters({ category: categoryFilter, price: null, rating: null, discount: null })}
            >
              Clear All Filters
            </button>
          </div>
        )}
        
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div className="product-item" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="no-products-found">
              <i className="fas fa-search"></i>
              <p>No products found matching your filters.</p>
              {Object.values(activeFilters).some(val => val !== null && val !== categoryFilter) && (
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveFilters({ category: categoryFilter, price: null, rating: null, discount: null })}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;