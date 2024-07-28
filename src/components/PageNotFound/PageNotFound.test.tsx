import { render, waitFor, screen } from '@testing-library/react';
import { mockStore } from '../../shared/test-constants';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';

describe('PageNotFound', () => {
  test('renders correct PageNotFound', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <PageNotFound />
        </BrowserRouter>
      </Provider>,
    );
    const counterElement = await waitFor(() => screen.getByTestId('pageNotFound'));
    expect(counterElement).toBeInTheDocument();
  });
});
