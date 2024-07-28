import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { Provider } from 'react-redux';
import { mockStore } from '../../shared/test-constants';
import { BrowserRouter } from 'react-router-dom';

describe('CardList Component', () => {
  test('displays loading message when loading is true', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <CardList />
        </BrowserRouter>
      </Provider>,
    );
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });
});
