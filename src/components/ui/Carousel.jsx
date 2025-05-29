import { useState, useEffect, useRef } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  
  const goToSlide = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      
      transitionTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Duration of the CSS transition
    }
  };
  
  const goToNextSlide = () => {
    const newIndex = (currentSlide + 1) % images.length;
    goToSlide(newIndex);
  };
  
  const goToPrevSlide = () => {
    const newIndex = (currentSlide - 1 + images.length) % images.length;
    goToSlide(newIndex);
  };
  
  // Auto play slides
  useEffect(() => {
    const play = () => {
      autoPlayRef.current = setTimeout(() => {
        goToNextSlide();
      }, 5000); // Change slide every 5 seconds
    };
    
    play();
    
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentSlide]);
  
  // Pause auto play on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
  };
  
  const handleMouseLeave = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    autoPlayRef.current = setTimeout(() => {
      goToNextSlide();
    }, 5000);
  };
  
  return (
    <div
      className="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image.src} alt={image.alt || `Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <button
        className="carousel-control carousel-control-prev"
        onClick={goToPrevSlide}
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <button
        className="carousel-control carousel-control-next"
        onClick={goToNextSlide}
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${
              currentSlide === index ? "active" : ""
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;