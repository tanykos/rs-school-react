import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './router/routes.tsx';
import { Provider } from 'react-redux';
import { initStore } from './store/store.ts';

const browserRouter = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={initStore()}>
        <RouterProvider router={browserRouter} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
