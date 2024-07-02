import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { RECIPES_TABLE_PATH } from 'src/constants';
import { firebaseDb } from 'src/main';
import { IRecipe } from 'src/types';

export const getRecipesByIngredient = async (ingredientIds: string[]): Promise<IRecipe[]> => {
  const queryRecipes = query(
    collection(firebaseDb, RECIPES_TABLE_PATH),
    orderBy('createdAt', 'desc'),
  );
  
  const querySnapshot = await getDocs(queryRecipes);
  const recipesById: IRecipe[] = [];

  querySnapshot.forEach((record) => {
    if (ingredientIds.every(id => (record.data() as IRecipe).ingredients.includes(id))) {
        recipesById.push(record.data() as IRecipe);
    }
  });

  return recipesById;
};
