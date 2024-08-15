import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App Component', () => {
  test('renders heading', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const headingElement = await waitFor(() => screen.getByText(/react forms/i));
    expect(headingElement).toBeInTheDocument();
  });
});
