import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import App from '../App';
import {
  CREATE_RECIPE_ROUTE,
  EDIT_RECIPE_ROUTE,
  INGREDIENTS_ROUTE,
  MY_PLANS,
  RECIPES_ROUTE,
  ROOT_ROUTE,
  SHOW_RECIPE_ROUTE,
  WEEK_PLANNING,
} from '../constants';
import {
  CreateRecipePage,
  EditRecipePage,
  IngredientsPage,
  MyPlansPage,
  RecipesPage,
  ShowRecipePage,
  TitlePage,
  WeekPlanningPage,
} from '../pages';

const routes = (
  <Route element={<App />}>
    <Route path={ROOT_ROUTE} element={<TitlePage />} />
    <Route path={RECIPES_ROUTE} element={<RecipesPage />} />
    <Route path={CREATE_RECIPE_ROUTE} element={<CreateRecipePage />} />
    <Route path={SHOW_RECIPE_ROUTE} element={<ShowRecipePage />} />
    <Route path={EDIT_RECIPE_ROUTE} element={<EditRecipePage />} />
    <Route path={INGREDIENTS_ROUTE} element={<IngredientsPage />} />
    <Route path={WEEK_PLANNING} element={<WeekPlanningPage />} />
    <Route path={MY_PLANS} element={<MyPlansPage />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));
export default router;
