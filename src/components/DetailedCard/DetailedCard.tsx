import { useLocation } from 'react-router-dom';
import './DetailedCard.scss';
import { useCallback, useEffect, useState } from 'react';
import { moviesApi } from '../../services/apiService';

export default function DetailedCard() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const movieIdFromUrl = urlParams.get('movieId') || '';
  const [movieId, setMovieId] = useState<string>(movieIdFromUrl);

  const { data, isLoading } = moviesApi.useFetchMovieByIdQuery(movieId);

  const fetchItemHandler = useCallback(async (movieId: string) => {
    setMovieId(movieId);
  }, []);

  useEffect(() => {
    fetchItemHandler(movieId);
  }, [fetchItemHandler, movieId]);

  return (
    <div className="detailedCard" data-testid="detailed-card">
      <h2>Movie Details:</h2>
      {isLoading && <p>Loading...</p>}
      {!isLoading && data && (
        <div className="movieDetails">
          <div className="detailRow">
            <span className="itemTitle">Title:</span> <span>{data.Title}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Year:</span> <span>{data.Year}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Genre:</span> <span>{data.Genre}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Country:</span> <span>{data.Country}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Language:</span> <span>{data.Language}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Runtime:</span> <span>{data.Runtime}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Actors:</span> <span>{data.Actors}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Plot:</span> <span>{data.Plot}</span>
          </div>
        </div>
      )}
    </div>
  );
}
