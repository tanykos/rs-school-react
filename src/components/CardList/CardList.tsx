import { Movie } from '../../types';
import Card from '../Card/Card';
import './CardList.scss';

interface CardListProps {
  results: Movie[];
  loading: boolean;
}

export default function CardList({ results, loading }: CardListProps) {
  const renderContent = () => {
    if (loading) {
      return <div className="loader">Loading...</div>;
    }

    if (results.length === 0) {
      return <div className="noMovies">No movies found</div>;
    }

    return results.map((movie) => <Card key={movie.id} movie={movie} />);
  };

  return <div className="cardList">{renderContent()}</div>;
}
