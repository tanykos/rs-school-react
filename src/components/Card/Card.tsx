import './Card.scss';
import { Movie } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { moviesApi } from '../../services/apiService';
import { addMovieDetails, deleteMovieById } from '../../store/slices/moviesSlice';

interface CardProps {
  movie: Movie;
}

export default function Card({ movie: { id, title, year, poster } }: CardProps) {
  const posterUrl = poster === 'N/A' ? './poster.svg' : poster;
  const posterClass = poster === 'N/A' ? 'placeholder' : 'poster';

  const dispatch = useAppDispatch();
  const selectedMovies = useAppSelector((state) => state.movies.selectedMovies);
  const isSelected = selectedMovies.some((selectedMovie) => selectedMovie.id === id);
  const [checked, setChecked] = useState(isSelected);

  const [fetchMovie] = moviesApi.useLazyFetchMovieByIdQuery();

  useEffect(() => {
    setChecked(isSelected);
  }, [isSelected]);

  const handleCheckboxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setChecked(!checked);
    if (!checked) {
      const movieDetails = await fetchMovie(id);
      if (movieDetails && movieDetails.data) {
        dispatch(addMovieDetails(movieDetails.data));
      }
    } else {
      dispatch(deleteMovieById(id));
    }
  };

  return (
    <div className={`movieCard ${checked ? 'selected' : ''}`} id={id} data-testid="movie-card">
      <div className="top-row">
        <input
          className="custom-checkbox"
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          data-testid="card-checkbox"
        />
      </div>

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
