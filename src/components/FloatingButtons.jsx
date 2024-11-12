import { useState, useEffect } from 'react';
import './FloatingButtons.css';

function FloatingButtons() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToOwned = () => {
    const ownedSection = document.querySelector('.owned-section');
    if (ownedSection) {
      ownedSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="floating-buttons">
      {showTopButton && (
        <button 
          className="float-button top-button"
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          ↑
        </button>
      )}
      <button 
        className="float-button owned-button"
        onClick={scrollToOwned}
        aria-label="Ir a capturados"
      >
        <span className="button-content">
          <span className="star-icon">★</span>
          <span className="button-text">Capturados</span>
        </span>
      </button>
    </div>
  );
}

export default FloatingButtons; 