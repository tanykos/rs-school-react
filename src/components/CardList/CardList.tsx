import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { moviesApi } from '../../services/apiService';
import Card from '../Card/Card';
import './CardList.scss';
import { Movie } from '../../types';
import Flyout from '../Flyout/Flyout';

export default function CardList() {
  const currentPage = useAppSelector((state) => state.page.currentPage);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';
  const { data, error, isLoading } = moviesApi.useFetchMoviesQuery({ term: searchTerm, page: currentPage });
  const selectedMovies = useAppSelector((state) => state.movies.selectedMovies);
  const selectedCount = selectedMovies.length;

  const renderContent = () => {
    if (isLoading) {
      return <div className="loader">Loading...</div>;
    }

    if (error) {
      return <h1>Error in Data fetching</h1>;
    }

    if (data && data.results.length === 0) {
      return (
        <div key="noMovies" className="noMovies">
          No movies found
        </div>
      );
    }

    if (data) return data.results.map((movie: Movie) => <Card key={movie.id} movie={movie} />);
  };

  return (
    <div className="cardList">
      {renderContent()}
      {!!selectedCount && <Flyout itemCount={selectedCount} />}
    </div>
  );
}
