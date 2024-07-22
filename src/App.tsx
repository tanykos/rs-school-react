import './styles/App.scss';
import CardList from './components/CardList/CardList';
import SearchSection from './components/SearchSection/SearchSection';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Paths } from './router/routesConstants';
import Pagination from './components/Pagination/Pagination';
import { useAppSelector } from './hooks/redux';
import { moviesApi } from './services/apiService';
import useSearchTerm from './hooks/useLocalStorage';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const matchDetails = useMatch(Paths.DETAILS);
  const searchParams = new URLSearchParams(location.search);

  const [searchTerm] = useSearchTerm('searchTerm', '');
  const currentPage = useAppSelector((state) => state.page.currentPage);

  const { data, error, isLoading } = moviesApi.useFetchMoviesQuery({
    term: searchTerm,
    page: currentPage,
  });

  const deleteMovieIdFromUrl = () => {
    searchParams.delete('movieId');
    navigate(`/?${searchParams.toString()}`);
  };

  const handleLeftBoxClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const card = (event.target as HTMLElement).closest('.movieCard');

    if (card) {
      const movieId = card.id;
      searchParams.set('movieId', movieId);
      navigate(`${Paths.DETAILS}?${searchParams.toString()}`);
    } else {
      deleteMovieIdFromUrl();
    }
  };

  const handleRightBoxClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (error) return <h1>Error in Data fetching.</h1>;

  return (
    <div className="app" onClick={handleLeftBoxClick}>
      <SearchSection />
      <div className="main-wrap">
        <div className="left-box">
          <CardList />
          {!isLoading && data && data.results.length > 0 && <Pagination />}
        </div>
        <div className={`right-box ${!matchDetails ? 'hide' : ''}`} onClick={handleRightBoxClick}>
          <button className={`close-button ${!matchDetails ? 'hide' : ''}`} onClick={deleteMovieIdFromUrl}>
            Close
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
