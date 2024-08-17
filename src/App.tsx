import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './router/routes';
import { Provider } from 'react-redux';
import { initStore } from './store/store';

export default function App() {
  const browserRouter = createBrowserRouter(routes);
  return (
    <Provider store={initStore()}>
      <div className="app">
        <RouterProvider router={browserRouter} />
      </div>
    </Provider>
  );
}
