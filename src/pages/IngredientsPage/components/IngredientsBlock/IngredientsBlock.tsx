import css from './IngredientsBlock.module.sass';
import { IIngredient } from 'src/types';
import Fridge from 'src/assets/hand-drawn-food.svg';
import Pancakes from 'src/assets/pancakes.svg';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { IngredientCard } from '../IngredientCard/IngredientCard';

interface IngredientsBlockProps {
  ingredients: IIngredient[];
  isSearch: boolean;
}

export const IngredientsBlock = ({
  ingredients,
  isSearch,
}: IngredientsBlockProps) => {
  if (ingredients.length === 0) {
    return (
      <Stack
        direction='column'
        useFlexGap
        spacing={2}
        className={css.ingredientsServiceWrapper}
      >
        {isSearch ? (
          <>
            <img className={css.ingredientsBlockLogo} src={Pancakes} />
            <Typography className={css.emptyMessage}>
              Ингредиенты не найдены
            </Typography>
          </>
        ) : (
          <>
            <img className={css.ingredientsBlockLogo} src={Fridge} />
            <Typography className={css.emptyMessage}>
              Добавьте первый ингредиент
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
      className={css.ingredientsBlockWrapper}
    >
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient.id} ingredient={ingredient} />
      ))}
    </Stack>
  );
};
