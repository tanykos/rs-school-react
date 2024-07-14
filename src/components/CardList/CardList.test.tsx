import { render, screen } from '@testing-library/react';
import CardList from './CardList';

describe('CardList Component', () => {
  test('renders the specified number of cards', () => {
    const movies = [
      { id: '1', title: 'Movie 1', poster: 'poster1.jpg', year: '2022' },
      { id: '2', title: 'Movie 2', poster: 'poster2.jpg', year: '2023' },
    ];

    render(<CardList results={movies} loading={false} />);

    movies.forEach((movie) => {
      const movieTitleElement = screen.getByText(movie.title);
      expect(movieTitleElement).toBeInTheDocument();
    });
  });

  test('displays a message when no cards are present', () => {
    const { getByText } = render(<CardList results={[]} loading={false} />);

    const messageElement = getByText(/No movies found/i);
    expect(messageElement).toBeInTheDocument();
  });

  test('displays loading message when loading is true', () => {
    const { getByText } = render(<CardList results={[]} loading={true} />);

    const loadingElement = getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });
});
