import { render, waitFor, screen } from '@testing-library/react';
import { mockStore } from '../../shared/test-constants';
import DetailedCard from './DetailedCard';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('Detailed Card', () => {
  test('renders correct Detailed Card', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <DetailedCard />
        </BrowserRouter>
      </Provider>,
    );
    const headingElement = await waitFor(() => screen.getByText(/Movie Details/i));
    expect(headingElement).toBeInTheDocument();
  });
});
