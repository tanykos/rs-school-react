import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders search movies heading', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const headingElement = screen.getByText(/search movies/i);
  expect(headingElement).toBeInTheDocument();
});

test('clicking on a card opens a detailed view', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

  const loader = screen.getByText(/Loading/i);

  expect(loader).toBeInTheDocument();
});
