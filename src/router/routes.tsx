import { RouteObject } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import { Paths } from './routesConstants';
import MainPage from '../pages/MainPage/MainPage';
import UncontrolledFormPage from '../pages/UncontrolledFormPage/UncontrolledFormPage';
import HookFormPage from '../pages/HookFormPage/HookFormPage';

export const routes: RouteObject[] = [
  {
    path: Paths.MAIN,
    element: <MainPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: Paths.UNCONTROLLED,
    element: <UncontrolledFormPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: Paths.HOOK_FORM,
    element: <HookFormPage />,
    errorElement: <PageNotFound />,
  },
];
