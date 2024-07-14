import './styles/App.scss';
import CardList from './components/CardList/CardList';
import SearchSection from './components/SearchSection/SearchSection';
import { Movie } from './types';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Paths } from './router/routesConstants';
import Pagination from './components/Pagination/Pagination';

export default function App() {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsOpen = location.pathname === Paths.DETAILS;
  const searchParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [currentPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchResults = useCallback(({ results, totalPages }: { results: Movie[]; totalPages: number }) => {
    setResults(results);
    setTotalPages(totalPages);
  }, []);

  return (
    <div className="app" onClick={handleLeftBoxClick}>
      <SearchSection
        onSearchResults={handleSearchResults}
        onLoading={setLoading}
        setPage={setCurrentPage}
        currentPage={currentPage}
      />
      <div className="main-wrap">
        <div className="left-box">
          <CardList results={results} loading={loading} />
          {!loading && results.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
        </div>
        <div className={`right-box ${!isDetailsOpen ? 'hide' : ''}`} onClick={handleRightBoxClick}>
          <button className={`close-button ${!isDetailsOpen ? 'hide' : ''}`} onClick={deleteMovieIdFromUrl}>
            Close
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
