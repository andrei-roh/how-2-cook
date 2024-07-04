import { doc, getDoc } from 'firebase/firestore';
import { RECIPES_TABLE_PATH } from 'src/constants';
import { firebaseDb } from 'src/main';
import { IRecipe } from 'src/types';

export const getRecipe = async (recipeId: string) => {
  const docRef = doc(firebaseDb, RECIPES_TABLE_PATH, recipeId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IRecipe;
  }

  return undefined;
};
