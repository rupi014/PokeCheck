import { useState, useEffect } from 'react';
import './PokemonList.css';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const unownedPokemons = pokemons.filter(pokemon => !checkedPokemons[pokemon.id]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando Pokémon...</p>
      </div>
    );
  }

  return (
    <div className="pokemon-container">
      <div className="pokemon-section">
        <div className="title-section">
          <img 
            src="/logo.png" 
            alt="PokeCheck Logo" 
            className="title-logo"
          />
          <div className="mobile-author">
            Hecho por Rubens Ballester · 
            <a href="https://x.com/rupidev" target="_blank" rel="noopener noreferrer">
              @rupidev
            </a>
          </div>
          <h1>Pokémon Disponibles</h1>
        </div>
        <div className="pokemon-grid">
          {unownedPokemons.map((pokemon) => (
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
          ))}
        </div>
      </div>

      {ownedPokemons.length > 0 && (
        <div className="pokemon-section owned-section">
          <h2>Pokémon Capturados ({ownedPokemons.length})</h2>
          <div className="pokemon-grid">
            {ownedPokemons.map((pokemon) => (
              <div 
                key={pokemon.id} 
                className="pokemon-card owned"
                onClick={() => handleCheck(pokemon.id)}
              >
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
