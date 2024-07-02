import { useCheckAuthentication } from 'src/hooks/useCheckAuthentication';
import css from './WeekPlanningPage.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { IRecipe, IState } from 'src/types';
import { useCheckAllIngredients } from 'src/hooks/useCheckAllIngredients';
import { useEffect, useState } from 'react';
import { RecipeCard, Select } from 'src/components';
import { getIngredientsToSelect } from 'src/utils/getIngredientsToSelect';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { getRecipesByIngredient } from 'src/utils/getRecipesByIngredient';
import { getAllRecipes } from 'src/utils/getAllRecipes';
import {
  addRecipesToList,
  setPreviousRoute,
  updatePlanningIngredientsList,
  updatePlanningRecipesList,
} from 'src/redux/actions';
import { WEEK_PLANNING } from 'src/constants';

export const WeekPlanningPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: IState) => state.user);
  const allIngredients = useSelector((state: IState) => state.ingredientsList);
  const planningIngredients = useSelector(
    (state: IState) => state.planningPage.ingredientsList
  );
  const planningRecipes = useSelector(
    (state: IState) => state.planningPage.recipesList
  );
  const currentRecipesList = useSelector((state: IState) => state.recipesList);

  const [recipeIngredients, setRecipeIngredients] = useState<string[] | []>(planningIngredients);
  const [isPlaning, setIsPlaning] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[] | null>(
    planningRecipes.length > 0 ? planningRecipes : null
  );
  const [isLoading, setIsLoading] = useState(currentRecipesList.length === 0);

  const handleGetRecipesByIngredient = () => {
    setIsPlaning(true);

    (recipeIngredients.length > 0
      ? getRecipesByIngredient(recipeIngredients)
      : getAllRecipes()
    ).then((res) => {
      setRecipes(res);
      setIsPlaning(false);

      dispatch(updatePlanningIngredientsList(recipeIngredients));
      dispatch(updatePlanningRecipesList(res));
      dispatch(setPreviousRoute(WEEK_PLANNING));
    });
  };

  useCheckAuthentication(user);
  useCheckAllIngredients(allIngredients);

  useEffect(() => {
    if (isLoading) {
      getAllRecipes().then((result) => {
        setIsLoading(false);
        dispatch(addRecipesToList(result));
      });
    }
  }, [dispatch, isLoading]);

  return (
    <div className={css.weekPlanningPageWrapper}>
      <div className={css.weekPlanningTitle}>Набор блюд на неделю</div>
      <Select
        value={recipeIngredients}
        setChange={setRecipeIngredients}
        options={getIngredientsToSelect(allIngredients)}
        labelText={'Ингредиенты'}
        multiple
        placeholder={'Выбор'}
        selectClassName={!recipeIngredients ? css.selectPlaceholder : undefined}
      />
      <Button
        className={css.submitButton}
        onClick={handleGetRecipesByIngredient}
      >
        {isPlaning ? (
          <CircularProgress color='inherit' size={32} />
        ) : (
          'Спланировать'
        )}
      </Button>
      {recipes && (
        <Stack
          direction='column'
          useFlexGap
          spacing={2}
          className={css.recipesBlockWrapper}
        >
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </Stack>
      )}
    </div>
  );
};
