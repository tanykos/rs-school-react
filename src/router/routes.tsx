import { RouteObject } from 'react-router-dom';
import App from '../App';
import PageNotFound from '../components/PageNotFound/PageNotFound';
import { Paths } from './routesConstants';

export const routes: RouteObject[] = [
  {
    path: Paths.HOME,
    element: <App />,
    errorElement: <PageNotFound />,
  },
];
