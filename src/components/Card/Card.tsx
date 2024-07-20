import './Card.scss';
import { Movie } from '../../types';

interface CardProps {
  movie: Movie;
}

export default function Card({ movie: { id, title, year, poster } }: CardProps) {
  const posterUrl = poster === 'N/A' ? './poster.svg' : poster;
  const posterClass = poster === 'N/A' ? 'placeholder' : 'poster';
  return (
    <div className="movieCard" id={id} data-testid="movie-card">
      <div
        className={`movieImage ${posterClass}`}
        style={{ backgroundImage: `url(${posterUrl})` }}
        aria-label={title}
      />
      <h3 className="movieYear">{year}</h3>
      <h2 className="movieTitle">{title}</h2>
    </div>
  );
}
