import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { IRecipe } from 'src/types';

export const getAllRecipes = async (): Promise<IRecipe[]> => {
  const queryRecipes = query(
    collection(firebaseDb, 'recipes'),
    orderBy('createdAt', 'desc'),
  );
  
  const querySnapshot = await getDocs(queryRecipes);
  const allRecipes: IRecipe[] = [];

  querySnapshot.forEach((record) => {
    allRecipes.push(record.data() as IRecipe);
  });

  return allRecipes;
};
