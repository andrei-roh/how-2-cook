import { IIngredient } from 'src/types';

export const getIngredientsLabels = (
  allIngredients: IIngredient[],
  ingredientsIds: string[]
) =>
  allIngredients.filter((ingredient) =>
    ingredientsIds.some((id) => id === ingredient.id)
  );
