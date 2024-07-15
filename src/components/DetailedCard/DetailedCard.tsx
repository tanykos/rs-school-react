import { useLocation } from 'react-router-dom';
import './DetailedCard.scss';
import { useCallback, useEffect, useState } from 'react';
import { fetchItemById } from '../../services/apiService';
import { MovieDetails } from '../../types';

export default function DetailedCard() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const movieId = urlParams.get('movieId') || '';
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchItemHandler = useCallback(async (movieId: string) => {
    try {
      setLoading(true);
      const res = await fetchItemById(movieId);
      setMovie(res);
    } catch (error) {
      console.error('Error fetching initial items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItemHandler(movieId);
  }, [fetchItemHandler, movieId]);

  return (
    <div className="detailedCard" data-testid="detailed-card">
      <h2>Movie Details:</h2>
      {loading && <p>Loading...</p>}
      {!loading && movie && (
        <div className="movieDetails">
          <div className="detailRow">
            <span className="itemTitle">Title:</span> <span>{movie.Title}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Year:</span> <span>{movie.Year}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Genre:</span> <span>{movie.Genre}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Country:</span> <span>{movie.Country}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Language:</span> <span>{movie.Language}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Runtime:</span> <span>{movie.Runtime}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Actors:</span> <span>{movie.Actors}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Plot:</span> <span>{movie.Plot}</span>
          </div>
        </div>
      )}
    </div>
  );
}
