import { useState, useEffect } from 'react';
import './FloatingButtons.css';
function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
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
    <>
      {isVisible && (
        <div className="floating-buttons">
          <button 
            className="float-button top-button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
          >
            ↑
          </button>
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
      )}
    </>
  );
}

export default FloatingButtons; 