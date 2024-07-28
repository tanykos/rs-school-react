import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from './App';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mockMovie, mockMovieDetails, mockStore } from './shared/test-constants';
import { vi } from 'vitest';
import { Paths } from './router/routesConstants';

vi.mock('../services/apiService', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    moviesApi: {
      useFetchMoviesQuery: vi.fn(() => ({
        data: {
          results: [mockMovie],
          totalPages: 1,
        },
        error: null,
        isLoading: false,
      })),
      useFetchMovieByIdQuery: vi.fn((id) => ({
        data: id === 'tt1234567' ? mockMovieDetails : null,
        error: null,
        isLoading: false,
      })),
    },
  };
});

describe('App Component', () => {
  test('renders search movies heading', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    const headingElement = await waitFor(() => screen.getByText(/search movies/i));
    expect(headingElement).toBeInTheDocument();
  });

  test('check Loader is displayed', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    await waitFor(() => {
      const loader = screen.getByText(/Loading/i);
      expect(loader).toBeInTheDocument();
    });
  });

  test('clicking on a card opens a detailed card component', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path={Paths.HOME} element={<App />} />
            <Route path={Paths.DETAILS} element={<div>Details Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    const cardElements = await waitFor(() => screen.getAllByTestId('movie-card'));

    expect(cardElements.length).toBeGreaterThan(0);
    await waitFor(() => {
      expect(cardElements[0]).toBeInTheDocument();
    });

    userEvent.click(cardElements[0]);

    await waitFor(() => {
      expect(screen.getByText(/Details Page/i)).toBeInTheDocument();
    });
  });
});
