import './styles/App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './router/routes';

export default function App() {
  const browserRouter = createBrowserRouter(routes);
  return (
    <div className="app">
      <RouterProvider router={browserRouter} />
    </div>
  );
}
