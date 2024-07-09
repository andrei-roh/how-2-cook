import { useCheckAuthentication } from 'src/hooks/useCheckAuthentication';
import css from './WeekPlanningPage.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { IRecipe, IState } from 'src/types';
import { useCheckAllIngredients } from 'src/hooks/useCheckAllIngredients';
import { useEffect, useState } from 'react';
import { RecipeCard } from 'src/components';
import Stack from '@mui/material/Stack';
import { getRecipesByIngredient } from 'src/utils/recipes/getRecipesByIngredient';
import { getAllRecipes } from 'src/utils/recipes/getAllRecipes';
import {
  addRecipesToList,
  setPreviousRoute,
  updatePlanningIngredientsList,
  updatePlanningRecipesList,
} from 'src/redux/actions';
import { WEEK_PLANNING } from 'src/constants';
import Pancakes from 'src/assets/pancakes.svg';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';
import { createPlanningList } from 'src/utils/planning/createPlanningList';
import { IngredientsSelect } from './components/IngredientsSelect/IngredientsSelect';
import { PlanCreationPanel } from './components/PlanCreationPanel/PlanCreationPanel';

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

  const [recipeIngredients, setRecipeIngredients] = useState<string[] | []>(
    planningIngredients
  );
  const [isPlanning, setIsPlanning] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[] | null>(
    planningRecipes.length > 0 ? planningRecipes : null
  );
  const [isLoading, setIsLoading] = useState(currentRecipesList.length === 0);
  const [isStartCreation, setIsStartCreation] = useState(false);
  const [planName, setPlanName] = useState('');
  const [allocatedRecipes, setAllocatedRecipe] = useState<string[]>([]);

  const handleGetRecipesByIngredient = () => {
    setIsPlanning(true);

    (recipeIngredients.length > 0
      ? getRecipesByIngredient(recipeIngredients)
      : getAllRecipes()
    ).then((res) => {
      setRecipes(res);
      setIsPlanning(false);

      dispatch(updatePlanningIngredientsList(recipeIngredients));
      dispatch(updatePlanningRecipesList(res));
      dispatch(setPreviousRoute(WEEK_PLANNING));
    });
  };
  const startCreationPlanningList = () => {
    setIsStartCreation(true);
  };
  const handleCreatePlan = () => {
    if (recipeIngredients.length > 0 && recipes) {
      const planId = uuidv4();

      createPlanningList(allocatedRecipes, recipeIngredients, planId, planName, user.email);

      setIsStartCreation(false);
    }
  };
  const handleAllocatedRecipe = (recipeId: string) => {
    setAllocatedRecipe((previousState) => {
      if (previousState.includes(recipeId)) {
        const newState = [...previousState];

        newState.splice(previousState.indexOf(recipeId), 1);

        return newState;
      } else {
        return [...previousState, recipeId];
      }
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
      <IngredientsSelect
        recipeIngredients={recipeIngredients}
        setRecipeIngredients={setRecipeIngredients}
        allIngredients={allIngredients}
        handleGetRecipesByIngredient={handleGetRecipesByIngredient}
        isPlanning={isPlanning}
        planningIngredients={planningIngredients}
      />
      {recipes && recipes.length > 0 ? (
        <>
          <Stack
            direction='column'
            useFlexGap
            spacing={2}
            className={css.recipesBlockWrapper}
          >
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                onAllocation={() => handleAllocatedRecipe(recipe.id)}
              />
            ))}
          </Stack>
          <PlanCreationPanel
            isStartCreation={isStartCreation}
            isAllocatedRecipes={allocatedRecipes.length > 0}
            planName={planName}
            setPlanName={setPlanName}
            handleCreatePlan={handleCreatePlan}
            startCreationPlanningList={startCreationPlanningList}
          />
        </>
      ) : (
        !!planningIngredients.length && (
          <>
            <img className={css.recipesBlockLogo} src={Pancakes} />
            <Typography className={css.emptyMessage}>
              Рецепты не найдены
            </Typography>
          </>
        )
      )}
    </div>
  );
};
