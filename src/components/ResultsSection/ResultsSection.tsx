import { Movie } from '../../types';
import './ResultsSection.scss';
import { Component } from 'react';

interface ResultsSectionProps {
  results: Movie[];
}

class ResultsSection extends Component<ResultsSectionProps> {
  render() {
    const { results } = this.props;

    return (
      <div className="resultsSection">
        {results.map((movie) => (
          <div key={movie.id} className="movieCard">
            <img src={movie.poster} alt={movie.title} className="movieImage" />
            <h2>{movie.title}</h2>
            <h3>{movie.year}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsSection;
