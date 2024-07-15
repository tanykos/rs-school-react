import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Component', () => {
  const mockMovie = {
    id: '1',
    title: 'Mock Movie',
    poster: '/mock-poster.jpg',
    year: '2023',
  };

  test('renders the relevant card data', () => {
    render(<Card movie={mockMovie} />);

    const movieTitle = screen.getByText(mockMovie.title);
    const movieYear = screen.getByText(mockMovie.year.toString());
    const moviePoster = screen.getByAltText(mockMovie.title) as HTMLImageElement;

    expect(movieTitle).toBeInTheDocument();
    expect(movieYear).toBeInTheDocument();
    expect(moviePoster).toBeInTheDocument();
    expect(moviePoster.src).toContain(mockMovie.poster);
  });
});
