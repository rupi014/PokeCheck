import './Header.css';

function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToOwned = () => {
    const ownedSection = document.querySelector('.owned-section');
    if (ownedSection) {
      ownedSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="logo">PokeCheck</div>
      <nav className="nav-links">
        <button onClick={scrollToTop}>DISPONIBLES</button>
        <button onClick={scrollToOwned}>CAPTURADOS</button>
      </nav>
      <div className="author-info">
        <span className="author-name">Hecha por Rubens Ballester</span>
        <a href="https://x.com/rupidev" target="_blank" rel="noopener noreferrer">
          @rupidev
        </a>
      </div>
    </header>
  );
}

export default Header;
