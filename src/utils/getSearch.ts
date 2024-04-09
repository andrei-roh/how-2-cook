import { IRecipe } from 'src/types';

export const getSearch = (recipes: IRecipe[], value?: string) => {
  if (recipes.length === 0 || !value) return recipes;

  const unsensitiveValue = value.toLowerCase();

  return recipes.filter((user) =>
    user.name.toLowerCase().startsWith(unsensitiveValue)
  );
};
