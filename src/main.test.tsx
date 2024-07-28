import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './router/routes';
import { Provider } from 'react-redux';
import { initStore } from './store/store';
import { ThemeProvider } from './context/ThemeContext';

const browserRouter = createBrowserRouter(routes);

test('renders main application without crashing', async () => {
  render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={initStore()}>
          <ThemeProvider>
            <RouterProvider router={browserRouter} />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>,
  );

  expect(screen.getByText(/search movies/i)).toBeInTheDocument();
});
