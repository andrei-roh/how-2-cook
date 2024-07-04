import { collection, deleteDoc, doc } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { Severity } from 'src/types';
import { showNotification } from '../showNotification';
import { INGREDIENTS_TABLE_PATH, NOTIFICATIONS } from 'src/constants';
import { getIngredient } from './getIngredient';

export const deleteIngredient = async (
  id: string,
  name: string
): Promise<boolean> => {
  const event = await getIngredient(id);
  const eventsRef = collection(firebaseDb, INGREDIENTS_TABLE_PATH);

  if (!event) {
    showNotification(
      NOTIFICATIONS(id).INGREDIENT_DOES_NOT_EXISTS,
      6000,
      Severity.Error
    );
    return false;
  }

  return await deleteDoc(doc(eventsRef, id))
    .then(() => {
      showNotification(
        NOTIFICATIONS(name).INGREDIENT_DELETED,
        3000,
        Severity.Success
      );

      return true;
    })
    .catch(() => {
      showNotification(
        NOTIFICATIONS(name).INGREDIENT_DELETION_ERROR,
        3000,
        Severity.Error
      );

      return false;
    });
};
