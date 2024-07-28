import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchSection from './SearchSection';
import { mockStore } from '../../shared/test-constants';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as pageSlice from '../../store/slices/pageSlice';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../store/slices/pageSlice', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    setPage: vi.fn().mockImplementation((page) => ({ type: 'page/setPage', payload: page })),
  };
});

describe('SearchSection Component', () => {
  test('updates inputValue state on input change', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SearchSection />
        </BrowserRouter>
      </Provider>,
    );

    const inputElement = screen.getByPlaceholderText('Enter a word in English...') as HTMLInputElement;
    const testValue = 'test input';

    fireEvent.change(inputElement, { target: { value: testValue } });

    expect(inputElement.value).toBe(testValue);
  });

  test('handles search form submission', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SearchSection />
        </BrowserRouter>
      </Provider>,
    );

    const inputElement = screen.getByPlaceholderText('Enter a word in English...') as HTMLInputElement;
    const formElement = screen.getByTestId('search-form');
    const testValue = 'test';

    fireEvent.change(inputElement, { target: { value: testValue } });

    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(pageSlice.setPage).toHaveBeenCalledWith(1);

      expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining(`?search=${testValue}`), { replace: true });
    });
  });
});
