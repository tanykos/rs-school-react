import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders heading', async () => {
    render(<App />);
    const headingElement = await waitFor(() => screen.getByText(/react forms/i));
    expect(headingElement).toBeInTheDocument();
  });
});
