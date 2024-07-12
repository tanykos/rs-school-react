import './styles/App.scss';
import CardList from './components/CardList/CardList';
import SearchSection from './components/SearchSection/SearchSection';
import { Movie } from './types';
import { useState } from 'react';

export default function App() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="app">
      <SearchSection onSearchResults={setResults} onLoading={setLoading} />
      <CardList results={results} loading={loading} />
    </div>
  );
}
