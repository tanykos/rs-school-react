import './styles/App.scss';
import ResultsSection from './components/ResultsSection/ResultsSection';
import SearchSection from './components/SearchSection/SearchSection';

function App() {
  return (
    <div className="app">
      <SearchSection />
      <ResultsSection />
    </div>
  );
}

export default App;
