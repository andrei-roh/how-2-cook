import { collection, deleteDoc, doc } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { Severity } from 'src/types';
import { showNotification } from './showNotification';
import { getRecipe } from './getRecipe';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { NOTIFICATIONS, RECIPES_TABLE_PATH } from 'src/constants';

export const deleteRecipe = async (id: string, imageUrl: string, name: string): Promise<boolean> => {
  const event = await getRecipe(id);
  const eventsRef = collection(firebaseDb, RECIPES_TABLE_PATH);

  if (!event) {
    showNotification(
      NOTIFICATIONS(id).RECIPE_DOES_NOT_EXISTS,
      6000,
      Severity.Error
    );
    return false;
  }

  const storage = getStorage();
  const storageRef = ref(storage, imageUrl);

  try {
    await deleteDoc(doc(eventsRef, id));
    await deleteObject(storageRef);

    showNotification(
      NOTIFICATIONS(name).RECIPE_DELETED,
      3000,
      Severity.Success
    );

    return true;
  } catch {
    showNotification(
      NOTIFICATIONS(name).RECIPE_DELETION_ERROR,
      3000,
      Severity.Error
    );

    return false;
  }
};
