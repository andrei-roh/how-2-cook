import css from './RecipesBlock.module.sass';
import { IRecipe } from 'src/types';
import Fridge from 'src/assets/hand-drawn-food.svg';
import Pancakes from 'src/assets/pancakes.svg';
import { RecipeCard } from '../RecipeCard/RecipeCard';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface RecipesBlockProps {
  recipes: IRecipe[];
  isSearch: boolean;
}

export const RecipesBlock = ({ recipes, isSearch }: RecipesBlockProps) => {
  if (recipes.length === 0) {
    return (
      <Stack
        direction='column'
        useFlexGap
        spacing={2}
        className={css.recipesServiceWrapper}
      >
        {isSearch ? (
          <>
            <img className={css.recipesBlockLogo} src={Pancakes} />
            <Typography className={css.emptyMessage}>
              Рецепты не найдены
            </Typography>
          </>
        ) : (
          <>
            <img className={css.recipesBlockLogo} src={Fridge} />
            <Typography className={css.emptyMessage}>
              Добавьте первый рецепт
            </Typography>
          </>
        )}
      </Stack>
    );
  }

  return (
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
  );
};
