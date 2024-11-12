import './App.css';
import PokemonList from './components/PokemonList';
import Header from './components/Header';
import FloatingButtons from './components/FloatingButtons';

function App() {
  return (
    <div className="App">
      <Header />
      <PokemonList />
      <FloatingButtons />
    </div>
  );
}

export default App;
