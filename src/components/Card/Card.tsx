import './Card.scss';
import { Movie } from '../../types';

interface CardProps {
  movie: Movie;
}

export default function Card({ movie }: CardProps) {
  return (
    <div className="movieCard" id={movie.id} data-testid="movie-card">
      <img src={movie.poster} alt={movie.title} className="movieImage" />
      <h2>{movie.title}</h2>
      <h3>{movie.year}</h3>
    </div>
  );
}
