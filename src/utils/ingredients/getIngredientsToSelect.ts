import { IIngredient } from 'src/types';

export const getIngredientsToSelect = (allIngredients: IIngredient[]) =>
  allIngredients.map((element) => ({
    name: element.name.toLocaleUpperCase(),
    value: element.id,
  }));
