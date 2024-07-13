import './styles/App.scss';
import CardList from './components/CardList/CardList';
import SearchSection from './components/SearchSection/SearchSection';
import { Movie } from './types';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Paths } from './router/routesConstants';

export default function App() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();
  const isDetailsOpen = location.pathname === Paths.DETAILS;

  return (
    <div className="app">
      <SearchSection onSearchResults={setResults} onLoading={setLoading} />
      <div className="main-wrap">
        <div className="left-box">
          <CardList results={results} loading={loading} />
        </div>
        <div className={`right-box ${!isDetailsOpen ? 'hide' : ''}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
