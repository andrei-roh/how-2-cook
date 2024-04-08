import { collection, doc, setDoc } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { IRecipe } from 'src/types';
import { showNotification } from './showNotification';
import { getRecipe } from './getRecipe';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { NOTIFICATIONS, RECIPES_TABLE_PATH } from 'src/constants';

export const createRecipe = async (
  newRecipe: IRecipe,
  image: File
): Promise<boolean> => {
  const event = await getRecipe(newRecipe.id);
  const eventsRef = collection(firebaseDb, RECIPES_TABLE_PATH);

  if (event) {
    showNotification(NOTIFICATIONS(newRecipe.id).RECIPE_EXISTS, 6000);
    return false;
  }

  const storage = getStorage();
  const storageRef = ref(
    storage,
    `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}/public/${newRecipe.id}`
  );

  try {
    await uploadBytes(storageRef, image);
    await setDoc(doc(eventsRef, newRecipe.id), newRecipe);

    showNotification(NOTIFICATIONS(newRecipe.name).RECIPE_CREATED, 3000);

    return true;
  } catch {
    showNotification(NOTIFICATIONS(newRecipe.name).RECIPE_CREATION_ERROR, 3000);

    return false;
  }
};
