import { Movie } from '../../types';
import Card from '../Card/Card';
import './CardList.scss';

interface CardListProps {
  results: Movie[];
  loading: boolean;
}

export default function CardList({ results, loading }: CardListProps) {
  return (
    <div className="cardList">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        results.map((movie) => <Card key={movie.id} movie={movie} />)
      )}
    </div>
  );
}
