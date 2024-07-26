import './DetailedCard.scss';
import { moviesApi } from '../../services/apiService';
import { useAppSelector } from '../../hooks/redux';

export default function DetailedCard() {
  const activeMovie = useAppSelector((state) => state.movies.activeMovie);
  const { data, isLoading } = moviesApi.useFetchMovieByIdQuery(activeMovie);

  return (
    <div className="detailedCard" data-testid="detailed-card">
      <h2>Movie Details:</h2>
      {isLoading && <p>Loading...</p>}
      {!isLoading && data && (
        <div className="movieDetails">
          <div className="detailRow">
            <span className="itemTitle">Title:</span> <span>{data.title}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Year:</span> <span>{data.year}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Genre:</span> <span>{data.genre}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Country:</span> <span>{data.country}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Language:</span> <span>{data.language}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Runtime:</span> <span>{data.runtime}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Actors:</span> <span>{data.actors}</span>
          </div>
          <div className="detailRow">
            <span className="itemTitle">Plot:</span> <span>{data.plot}</span>
          </div>
        </div>
      )}
    </div>
  );
}
