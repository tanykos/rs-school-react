import './Card.scss';
import { Movie } from '../../types';

interface CardProps {
  movie: Movie;
}

export default function Card({ movie }: CardProps) {
  const posterUrl = movie.poster === 'N/A' ? './poster.png' : movie.poster;
  const posterClass = movie.poster === 'N/A' ? 'placeholder' : 'poster';
  return (
    <div className="movieCard" id={movie.id} data-testid="movie-card">
      <div
        className={`movieImage ${posterClass}`}
        style={{ backgroundImage: `url(${posterUrl})` }}
        aria-label={movie.title}
      />
      <h3 className="movieYear">{movie.year}</h3>
      <h2 className="movieTitle">{movie.title}</h2>
    </div>
  );
}
