import Box from '@mui/material/Box';
import css from './PlanCard.module.sass';
import { IIngredient, IPlanningList, IRecipe } from 'src/types';
import { getIngredientsLabels } from 'src/utils/ingredients/getIngredientsLabels';
import { Ingredient } from 'src/components/Ingredient/Ingredient';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { RecipeCard } from 'src/components';

interface PlanCardProps {
  plan: IPlanningList;
  allIngredients: IIngredient[];
  allRecipes: IRecipe[];
}

export const PlanCard = ({
  plan,
  allIngredients,
  allRecipes,
}: PlanCardProps) => {
  const { name, ingredientsList, recipesList } = plan;

  const recipes = allRecipes.filter((recipe) =>
    recipesList.some((recipeId) => recipeId === recipe.id)
  );

  return (
    <Box className={css.planContainer}>
      <Typography variant='h6'>{name}</Typography>
      <Box className={css.ingredientsBlock}>
        {getIngredientsLabels(allIngredients, ingredientsList).map(
          (ingredient) => (
            <Ingredient key={ingredient.id} name={ingredient.name} />
          )
        )}
      </Box>
      <Stack direction='column' useFlexGap className={css.planRecipesBlock}>
        {recipes.length === 0
          ? 'Рецептов нет'
          : recipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
      </Stack>
    </Box>
  );
};
