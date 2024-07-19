import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Paths } from './router/routesConstants';
import userEvent from '@testing-library/user-event';

const mockMovie = {
  id: 'tt1234567',
  title: 'Mock Movie',
  year: '2021',
  poster: 'mock-poster.jpg',
};

const mockMovieDetails = {
  imdbID: 'tt1234567',
  Title: 'Mock Movie',
  Year: '2021',
  Genre: 'Action',
  Country: 'USA',
  Language: 'English',
  Runtime: '120 min',
  Actors: 'Actor 1, Actor 2',
  Plot: 'This is a mock movie plot.',
};

vi.mock('./services/apiService', () => ({
  fetchItems: vi.fn(() => ({
    results: [mockMovie],
    totalPages: 1,
  })),
  fetchItemById: vi.fn((id) => {
    if (id === 'tt1234567') {
      return Promise.resolve(mockMovieDetails);
    }
    return Promise.resolve(null);
  }),
}));

describe('App Component', () => {
  test('renders search movies heading', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const headingElement = await waitFor(() => screen.getByText(/search movies/i));
    expect(headingElement).toBeInTheDocument();
  });

  test('check Loader is displayed', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const loader = screen.getByText(/Loading/i);
      expect(loader).toBeInTheDocument();
    });
  });

  test('clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path={Paths.HOME} element={<App />} />
          <Route path={Paths.DETAILS} element={<div>Details Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const cardElement = await waitFor(() => screen.getByText(/Mock Movie/i));
    expect(cardElement).toBeInTheDocument();

    userEvent.click(cardElement);

    await waitFor(() => {
      expect(screen.getByText(/Details Page/i)).toBeInTheDocument();
    });
  });
});
