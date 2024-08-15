import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './router/routes';

const browserRouter = createBrowserRouter(routes);

test('renders main application without crashing', async () => {
  render(
    <React.StrictMode>
      <ErrorBoundary>
        <RouterProvider router={browserRouter} />
      </ErrorBoundary>
    </React.StrictMode>,
  );

  expect(screen.getByText(/react forms/i)).toBeInTheDocument();
});
