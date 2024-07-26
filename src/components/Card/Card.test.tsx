import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Card from './Card';
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../../store/slices/moviesSlice';

describe('Card Component', () => {
  const mockMovie = {
    id: '1',
    title: 'Mock Movie',
    poster: '/mock-poster.jpg',
    year: '2023',
  };

  const mockStore = configureStore({
    reducer: {
      movies: moviesReducer,
    },
    preloadedState: {
      movies: {
        selectedMovies: [],
        results: [],
        totalPages: 0,
        activeMovie: '',
      },
    },
  });

  test('renders the relevant card data', () => {
    render(
      <Provider store={mockStore}>
        <Card movie={mockMovie} />
      </Provider>,
    );

    const movieTitle = screen.getByText(mockMovie.title);
    const movieYear = screen.getByText(mockMovie.year.toString());

    expect(movieTitle).toBeInTheDocument();
    expect(movieYear).toBeInTheDocument();
  });
});
