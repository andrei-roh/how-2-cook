import css from './Ingredient.module.sass';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface IngredientProps {
  name: string;
}

export const Ingredient = ({ name }: IngredientProps) => {
  return (
    <Box className={css.ingredientContainer}>
      <Typography variant='button'>{name}</Typography>
    </Box>
  );
};
