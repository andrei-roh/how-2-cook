import { collection, doc, updateDoc } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { IRecipe, Severity } from 'src/types';
import { showNotification } from './showNotification';
import { NOTIFICATIONS, RECIPES_TABLE_PATH } from 'src/constants';
import { getRecipe } from './getRecipe';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

export const editRecipe = async (
  recipeId: string,
  updatedFields: Partial<IRecipe>,
  newImage: File | null
): Promise<boolean> => {
  const recipe = await getRecipe(recipeId);
  const recipesRef = collection(firebaseDb, RECIPES_TABLE_PATH);
  let storage = null;
  let storageRef = null;

  if (!recipe) {
    showNotification(NOTIFICATIONS(recipeId).RECIPE_DOES_NOT_EXISTS, 6000, Severity.Error);
    return false;
  }



  try {
    if (newImage) {
      storage = getStorage();
      storageRef = ref(
        storage,
        `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}/public/${recipe.id}`
      );

      await uploadBytes(storageRef, newImage);
    }

    await updateDoc(doc(recipesRef, recipeId), { ...updatedFields });

    showNotification(NOTIFICATIONS(recipeId).RECIPE_UPDATED, 3000, Severity.Success);

    return true;
  } catch {
    showNotification(NOTIFICATIONS(recipeId).RECIPE_UPDATE_ERROR, 3000, Severity.Error);

    return false;
  }
};
