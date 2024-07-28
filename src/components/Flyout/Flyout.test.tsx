import { render, waitFor, screen } from '@testing-library/react';
import { mockStore } from '../../shared/test-constants';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Flyout from './Flyout';
import { vi } from 'vitest';

Object.defineProperty(this, 'URL', {
  value: {
    createObjectURL: vi.fn(() => 'mockedURL'),
  },
  writable: true,
});

beforeAll(() => {
  URL.createObjectURL = vi.fn(() => 'mockedURL');
});

describe('Flyout Component', () => {
  test('renders correct Flyout Component', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Flyout itemCount={3} />
        </BrowserRouter>
      </Provider>,
    );
    const counterElement = await waitFor(() => screen.getByTestId('flyout'));
    expect(counterElement).toBeInTheDocument();
  });
});
