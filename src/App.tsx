import './styles/App.scss';
import CardList from './components/CardList/CardList';
import SearchSection from './components/SearchSection/SearchSection';
import { Movie } from './types';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Paths } from './router/routesConstants';

export default function App() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsOpen = location.pathname === Paths.DETAILS;

  const handleLeftBoxClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const card = (event.target as HTMLElement).closest('.movieCard');
    console.log('in Click: card: ', card);
    if (card) {
      const movieId = card.id;
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('movieId', movieId);
      navigate(`${Paths.DETAILS}?movieId=${movieId}`);
    } else if ((event.target as HTMLElement).classList.contains('cardList')) {
      navigate('/');
    }
  };

  return (
    <div className="app">
      <SearchSection onSearchResults={setResults} onLoading={setLoading} />
      <div className="main-wrap">
        <div className="left-box" onClick={handleLeftBoxClick}>
          <CardList results={results} loading={loading} />
        </div>
        <div className={`right-box ${!isDetailsOpen ? 'hide' : ''}`}>
          <button className={`close-button ${!isDetailsOpen ? 'hide' : ''}`} onClick={() => navigate('/')}>
            Close
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
