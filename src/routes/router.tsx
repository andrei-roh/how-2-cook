import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from '../App';
import { RECIPES_ROUTE, ROOT_ROUTE } from '../constants';
import { RecipesPage, TitlePage } from '../pages';

const routes = (
  <Route element={<App />}>
    <Route path={ROOT_ROUTE} element={<TitlePage />} />
    <Route path={RECIPES_ROUTE} element={<RecipesPage />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));
export default router;
