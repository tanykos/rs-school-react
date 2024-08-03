import './styles/App.scss';
import CardList from './components/CardList/CardList';
import SearchSection from './components/SearchSection/SearchSection';
import { Outlet, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Paths } from './router/routesConstants';
import Pagination from './components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { moviesApi } from './services/apiService';
import { setActiveMovie } from './store/slices/moviesSlice';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import { ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';

export default function App() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const matchDetails = useMatch(Paths.DETAILS);
  const searchParams = new URLSearchParams(location.search);

  const searchTerm = searchParams.get('search') || '';
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
      dispatch(setActiveMovie(card.id));
      searchParams.set('movieId', card.id);
      navigate(`${Paths.DETAILS}?${searchParams.toString()}`);
    } else {
      deleteMovieIdFromUrl();
      dispatch(setActiveMovie(''));
    }
  };

  const handleRightBoxClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  if (error) return <h1>Error in Data fetching.</h1>;

  return (
    <div className="app" onClick={handleLeftBoxClick} data-theme={theme}>
      <ThemeSelector />
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
