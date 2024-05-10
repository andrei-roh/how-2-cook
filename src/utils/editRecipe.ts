import { collection, doc, updateDoc } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { IRecipe, Severity } from 'src/types';
import { showNotification } from './showNotification';
import { NOTIFICATIONS } from 'src/constants';
import { getRecipe } from './getRecipe';

export const editRecipe = async (
  recipeId: string,
  updatedFields: Partial<IRecipe>
): Promise<boolean> => {
  const recipe = await getRecipe(recipeId);
  const recipesRef = collection(firebaseDb, 'recipes');

  if (!recipe) {
    showNotification(NOTIFICATIONS(recipeId).RECIPE_DOES_NOT_EXISTS, 6000, Severity.Error);
    return false;
  }

  try {
    await updateDoc(doc(recipesRef, recipeId), { ...updatedFields });

    showNotification(NOTIFICATIONS(recipeId).RECIPE_UPDATED, 3000, Severity.Success);

    return true;
  } catch {
    showNotification(NOTIFICATIONS(recipeId).RECIPE_UPDATE_ERROR, 3000, Severity.Error);

    return false;
  }
};
