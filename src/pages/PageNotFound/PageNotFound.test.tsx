import { render, waitFor, screen } from '@testing-library/react';
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';

describe('PageNotFound', () => {
  test('renders correct PageNotFound', async () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>,
    );
    const counterElement = await waitFor(() => screen.getByTestId('pageNotFound'));
    expect(counterElement).toBeInTheDocument();
  });
});
