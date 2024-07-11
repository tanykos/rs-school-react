import './styles/App.scss';
import CardList from './components/CardList/CardList';
import SearchSection from './components/SearchSection/SearchSection';
import { Movie } from './types';
import { useCallback, useState } from 'react';

export default function App() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchResults = useCallback((results: Movie[]) => {
    setResults(results);
  }, []);

  const handleOnLoading = useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  return (
    <div className="app">
      <SearchSection onSearchResults={handleSearchResults} onLoading={handleOnLoading} />
      <CardList results={results} loading={loading} />
    </div>
  );
}
