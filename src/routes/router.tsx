import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from '../App';
import { CREATE_RECIPE_ROUTE, RECIPES_ROUTE, ROOT_ROUTE, SHOW_RECIPE_ROUTE } from '../constants';
import { CreateRecipePage, RecipesPage, ShowRecipePage, TitlePage } from '../pages';

const routes = (
  <Route element={<App />}>
    <Route path={ROOT_ROUTE} element={<TitlePage />} />
    <Route path={RECIPES_ROUTE} element={<RecipesPage />} />
    <Route path={CREATE_RECIPE_ROUTE} element={<CreateRecipePage />} />
    <Route path={SHOW_RECIPE_ROUTE} element={<ShowRecipePage />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));
export default router;
