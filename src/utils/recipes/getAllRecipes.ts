import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { RECIPES_TABLE_PATH } from 'src/constants';
import { firebaseDb } from 'src/main';
import { IRecipe } from 'src/types';

export const getAllRecipes = async (): Promise<IRecipe[]> => {
  const queryRecipes = query(
    collection(firebaseDb, RECIPES_TABLE_PATH),
    orderBy('createdAt', 'desc'),
  );
  
  const querySnapshot = await getDocs(queryRecipes);
  const allRecipes: IRecipe[] = [];

  querySnapshot.forEach((record) => {
    allRecipes.push(record.data() as IRecipe);
  });

  return allRecipes;
};
