import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // Import the CSS file


const Slideshow = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to advance to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Automatically advance to the next slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
          {/* Slide content */}
          <img src={slide.image} alt={slide.alt} />
          <div className="caption">{slide.caption}</div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
