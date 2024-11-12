import { useState, useEffect } from 'react';
import './PokemonList.css';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedPokemons, setCheckedPokemons] = useState(
    JSON.parse(localStorage.getItem('checkedPokemons')) || {}
  );

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        
        const pokemonList = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
        
        setPokemons(pokemonList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching pokemon:', error);
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handleCheck = (pokemonId) => {
    const newCheckedPokemons = {
      ...checkedPokemons,
      [pokemonId]: !checkedPokemons[pokemonId]
    };
    setCheckedPokemons(newCheckedPokemons);
    localStorage.setItem('checkedPokemons', JSON.stringify(newCheckedPokemons));
  };

  const ownedPokemons = pokemons.filter(pokemon => checkedPokemons[pokemon.id]);
  const unownedPokemons = pokemons
    .filter(pokemon => 
      !checkedPokemons[pokemon.id] && 
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const searchResults = searchTerm 
    ? pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : unownedPokemons;

  if (isLoading) {
    return (
      <div className="pokemon-container">
        <div className="pokemon-section">
          <div className="title-section">
            <div className="logo-placeholder"></div>
            <h2>Cargando...</h2>
          </div>
          <div className="pokemon-grid">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="pokemon-card skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-container">
      <div className="pokemon-section">
        <div className="title-section">
          <img 
            src="/logo.webp" 
            alt="PokeCheck Logo" 
            className="title-logo"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="mobile-author">
            Hecho por Rubens Ballester · 
            <a href="https://x.com/rupidev" target="_blank" rel="noopener noreferrer">
              @rupidev
            </a>
          </div>
          <h2>Pokémon Disponibles ({unownedPokemons.length})</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="pokemon-grid">
          {searchResults.length > 0 ? (
            searchResults.map((pokemon) => (
              <div 
                key={pokemon.id} 
                className={`pokemon-card ${checkedPokemons[pokemon.id] ? 'owned' : ''}`}
                onClick={() => handleCheck(pokemon.id)}
              >
                <div className="pokedex-number">#{String(pokemon.id).padStart(3, '0')}</div>
                <img src={pokemon.image} alt={pokemon.name} />
                <p className="pokemon-name">{pokemon.name}</p>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={checkedPokemons[pokemon.id] || false}
                    readOnly
                  />
                  <span className="checkbox-text">Lo tengo</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">El Pokémon no existe</div>
          )}
        </div>
      </div>

      <div className="pokemon-section owned-section">
        <h2>Pokémon Capturados ({ownedPokemons.length})</h2>
        <div className="pokemon-grid">
          {ownedPokemons.length > 0 ? (
            ownedPokemons.map((pokemon) => (
              <div 
                key={pokemon.id} 
                className="pokemon-card owned"
                onClick={() => handleCheck(pokemon.id)}
              >
                <div className="pokedex-number">#{String(pokemon.id).padStart(3, '0')}</div>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>{pokemon.name}</p>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={true}
                    readOnly
                  />
                  <span>Liberar</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">Aún no tienes ningún Pokémon</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
