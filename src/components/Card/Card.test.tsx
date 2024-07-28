import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Card from './Card';
import { vi } from 'vitest';
import { mockMovie, mockStore } from '../../shared/test-constants';
import { moviesApi } from '../../services/apiService';

describe('Card Component', () => {
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

  test('handles checkbox change and calls fetchMovie', async () => {
    const fetchMovieMock = vi.fn();
    vi.spyOn(moviesApi, 'useLazyFetchMovieByIdQuery').mockReturnValue([
      fetchMovieMock,
      { data: null, isFetching: false, isError: false },
      { lastArg: 'test' },
    ]);
    render(
      <Provider store={mockStore}>
        <Card movie={mockMovie} />
      </Provider>,
    );

    const checkbox = screen.getByTestId('card-checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    expect(fetchMovieMock).toHaveBeenCalledWith(mockMovie.id);
  });
});
